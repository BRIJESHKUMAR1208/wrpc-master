import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import apiClient from "../../../Api/ApiClient";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay"
import CmsDisplayVertical from "../Header/CmsDisplayVertical";
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
 import "./Quicklinkmenu.css";

export const Quicklinkmenu = () => {
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
<CmsDisplay/>
        <CmsDisplayVertical />
        <main>
        <CmsFooter />
          {/* <div className="container mt-4 vh-100">
            
          </div> */}
        
        </main>
      </div>
    </>
  );
};
