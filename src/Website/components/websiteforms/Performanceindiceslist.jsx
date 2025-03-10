import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import apiClient from "../../../Api/ApiClient";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../../components/Footer/CmsFooter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { CSmartTable } from "@coreui/react-pro";
import { DesktopDatePicker } from "@mui/x-date-pickers";

export const PerformanceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [utilities, setUtilities] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Fetch utilities when both year and month are selected
  useEffect(() => {
    const fetchUtilities = async () => {
      if (selectedYear && selectedMonth) {
        try {
          const response = await apiClient.get(
            `/api/PerformanceIndices/getyearmonth/${selectedYear}/${selectedMonth}`
          );
          const utilitiesData = response.data.map((row) => ({
            value: row.id,
            label: row.utilityname,
          }));
          const allOption = { value: 'All', label: 'All Utilities' };
          setUtilities([allOption, ...utilitiesData]);
        } catch (error) {
          setError("Error fetching utilities data");
        }
      }
    };

    // Only fetch utilities if both year and month are selected
    if (selectedYear && selectedMonth) {
      fetchUtilities();
    }
  }, [selectedYear, selectedMonth]); // Trigger when selectedYear or selectedMonth changes

  // Handle Year change
  const handleYearChange = (date) => {
    if (date && date.isValid()) {
      setSelectedYear(date.year());
      setSelectedMonth(null); // Reset month when year changes
      setSelectedUtility(null); // Reset utility when year changes
    } else {
      setSelectedYear(null);
    }
  };

  // Handle Month change
  const handleMonthChange = (month) => {
    if (month) {
      setSelectedMonth(month.month() + 1); // Adjust month for API (0-based month)
    }
  };

  // Handle Utility change and fetch performance data
  const handleUtilityChange = async (event) => {
    const selectedUtilityId = event.target.value;
    setSelectedUtility(selectedUtilityId);

    if (selectedYear && selectedMonth) {
      setLoading(true);
      try {
        let response;
        if (selectedUtilityId === "All") {
          // Call the API that fetches data for all utilities
          response = await apiClient.get(
            `/api/PerformanceIndices/getyearmonth/${selectedYear}/${selectedMonth}`
          );
        } else {
          // Call the API for a specific utility
          response = await apiClient.get(
            `/api/PerformanceIndices/getperformance/${selectedUtilityId}?year=${selectedYear}&month=${selectedMonth}`
          );
        }
        setData(response.data); // Assuming response data contains performance data
        setError(""); // Clear any previous errors
      } catch (error) {
        setError("Error fetching performance data.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please select both year and month before selecting a utility.");
    }
  };

  // Columns for the performance data table
  const columns = [
    { key: "ut", label: "Utility" },
    { key: "nc", label: "Number of correct operations at internal power system faults (Nc)" },
    { key: "nu", label: "Number of unwanted operations (Nu)" },
    { key: "nf", label: "Number of failures to operate at internal power system faults (Nf)" },
    { key: "ni", label: "Number of incorrect operations (Ni=Nf+Nu)" },
    { key: "d", label: "The Dependability Index (D=Nc/(Nc+Nf))" },
    { key: "s", label: "The Security Index (S=Nc/(Nc+Nu))" },
    { key: "r", label: "The Reliability Index (R=Nc/(Nc+Ni))" },
  ];

  // Format the performance data
  const datas = data.map((item) => ({
    ut: item.utilityname,
    nc: item.correct_operation,
    nu: item.unwanted_operation,
    nf: item.failures_operate,
    ni: item.incorrectoperations_ni,
    d: item.dependabilityindex,
    s: item.securityindex,
    r: item.reliabilityindex,
  }));

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-80">
            <h4>Performance Indices List</h4>
            <div className="date-sec row">
              <div className="col-md-2">
                <div className="date-main">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["YearCalendar", "YearCalendar", "YearCalendar"]}>
                      <DatePicker
                        label={"Year"}
                        views={["year"]}
                        minDate={dayjs("2023-10-01")}
                        maxDate={dayjs()}
                        renderInput={(params) => <TextField {...params} />}
                        value={selectedYear ? dayjs(`${selectedYear}`) : null}
                        onChange={handleYearChange}
                        openTo="year"
                        enableAccessibleFieldDOMStructure
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div className="col-md-3">
                <div className="date-main">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["month"]}>
                      <DesktopDatePicker
                        views={["month"]}
                        label={"Month"}
                        minDate={selectedYear === 2023 ? dayjs("2023-10-01") : dayjs(`${selectedYear}-01-01`)}
                        maxDate={dayjs(`${selectedYear}-12-31`)}
                        value={selectedMonth ? dayjs(`${selectedYear}-${selectedMonth}-01`) : null}
                        onChange={(date) => handleMonthChange(date)}
                        closeOnSelect={true}
                        openTo="month"
                        disabled={!selectedYear}
                        disableFuture={true}
                        enableAccessibleFieldDOMStructure

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div className="col-md-6">
                <TextField
                  id="outlined-select-utility"
                  select
                  label="Utility"
                  fullWidth
                  value={selectedUtility}
                  onChange={handleUtilityChange}
                  size="normal"
                  disabled={!selectedYear || !selectedMonth} // Disable if either year or month is not selected
                >
                  {utilities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {loading ? (
              <Spinner animation="border" />
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : selectedUtility ? (
              // <CSmartTable columns={columns} items={datas} />
              <CSmartTable
                columns={columns}
                items={datas}
                itemsPerPage={itemsPerPage}
                pagination
              />
            ) : (
              <p>Please select a utility to view the performance data.</p>
            )}
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};
