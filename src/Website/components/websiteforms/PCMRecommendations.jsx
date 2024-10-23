import React, { useState, useEffect } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import apiClient from "../../../Api/ApiClient";
import apis from '../../../Api/api.json';

const PCMRecommendations = () => {
  const [utilities, setUtilities] = useState([]);
  const [pcm, setPcm] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch utilities and PCM data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoints
       // const utilityResponse = await fetch("API_URL_FOR_UTILITIES");
        const utilityResponse = await apiClient.get(apis.relaysave);
       // const pcmResponse = await fetch("API_URL_FOR_PCM");
        const pcmResponse = await apiClient.get(apis.relaysave);

        if (!utilityResponse.ok || !pcmResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const utilityData = await utilityResponse.json();
        const pcmData = await pcmResponse.json();

        // Assuming the data structure is an array of objects with 'id' and 'label' or 'value'
        setUtilities(utilityData);
        setPcm(pcmData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUtilityChange = (event) => {
    const utilityid = event.target.value;
    setSelectedUtility(utilityid);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-100">
            <h1>PCM Meeting Recommendations and Compliance</h1>
            <div className="date-sec row">
              <div className="col-md-2">
                <TextField
                  id="outlined-select-pcm"
                  select
                  label="PCM"
                  fullWidth
                  size="normal"
                >
                  {pcm.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-8">
                <TextField
                  id="outlined-select-utility"
                  select
                  label="Utility"
                  fullWidth
                  size="normal"
                  value={selectedUtility}
                  onChange={handleUtilityChange}
                >
                  {utilities.map((item) => (
                    <MenuItem key={item.id} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {selectedUtility ? (
              <div>{selectedUtility.toUpperCase()}</div>
            ) : (
              <p>
                Please select a utility to view the PCM Meeting Recommendations
                and Compliance
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default PCMRecommendations;
