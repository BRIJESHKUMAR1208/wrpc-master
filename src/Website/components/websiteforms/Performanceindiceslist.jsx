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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [utilities, setUtilities] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState(null);

  const handleYearChange = (date) => {
    if (date && date.isValid()) {
      setSelectedYear(date.year());
      setSelectedMonth(null);
    } else {
      setSelectedYear(null);
    }
  };

  const minMonthDate =
    selectedYear === "2023" ? dayjs("2023-10-01") : dayjs(`${selectedYear}-01-01`);
    const maxMonthDate = selectedYear ? dayjs(`${selectedYear}-12-31`) : dayjs();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/api/PerformanceIndices");
        const utilitiesData = response.data.map((row) => ({
          value: row.id, // Assuming utilityId is the identifier
          label: row.utilityname, // Assuming utilityName is the name of the utility
        }));
        setUtilities(utilitiesData);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUtilityChange = async (event) => {
    const selectedUtilityId = event.target.value;
    setSelectedUtility(selectedUtilityId);
    
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/PerformanceIndices/getperformance/${selectedUtilityId}`);
      console.log(response.data); // Log the response data
      const utilityData = response.data;
      setData(utilityData); // Assuming the API returns the data you want to display
    } catch (error) {
      setError("Error fetching data for selected utility");
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const columns = [
    {
      key: "ut",
      label: "Utility",
    },
    {
      key: "nc",
      label: "Number of correct operations at internal power system faults (Nc)",
    },
    {
      key: "nu",
      label: "Number of unwanted operations (Nu)",
    },
    {
      key: "nf",
      label: "Number of failures to operate at internal power system faults (Nf)",
    },
    {
      key: "ni",
      label: "Number of incorrect operations (Ni=Nf+Nu)",
    },
    {
      key: "d",
      label: "The Dependability Index (D=Nc/(Nc+Nf))",
    },
    {
      key: "s",
      label: "The Security Index (S=Nc/(Nc+Nu))",
    },
    {
      key: "r",
      label: "The Reliability Index (R=Nc/(Nc+Ni))",
    },
  ];

  const datas = data.map((item) => ({
    ut: item.utilityname,
    nc: item.correct_operation,
    nu: item.unwanted_operation,
    nf: item.failures_operate,
    ni: item.incorrectoperations_ni,
    d: item.dependabilityindex,
    s: item.securityindex,
    r: item.reliabilityindex,
    // ni: item.incorrect_operation,
    // d: item.dependability_index,
    // s: item.security_index,
    // r: item.reliability_index,

  }));

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-100">
            <h4>Performance Indices List</h4>
            <div className="date-sec row">
              <div className="col-md-2">
                <div className="date-main">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["YearCalendar","YearCalendar","YearCalendar"]}>
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
                        minDate={selectedYear === 2023 ? dayjs("2023-10-01") : minMonthDate}
                        maxDate={maxMonthDate}
                        value={selectedMonth ? dayjs(selectedMonth) : null}
                        onChange={setSelectedMonth}
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
                >
                  {utilities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {selectedUtility ? (
              <CSmartTable columns={columns} items={datas} />
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
