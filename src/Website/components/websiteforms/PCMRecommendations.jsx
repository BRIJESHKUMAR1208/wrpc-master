import React, { useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

const PCMRecommendations = () => {
  const utilities = [
    { id: 1, label: "MSETCL" },
    { id: 2, label: "MPPTCL" },
    { id: 3, label: "GETCO" },
    { id: 4, label: "CSPTCL" },
    { id: 5, label: "GED (Goa) " },
    { id: 6, label: "DD" },
    { id: 7, label: "DNH" },
    { id: 8, label: "RE Generators" },
    { id: 9, label: "POWER GRID WR1" },
    { id: 10, label: "POWER GRID WR2" },
    { id: 11, label: "NTPC" },
  ];

  const pcm = [
    { id: 1, value: "153" },
    { id: 2, value: "154" },
    { id: 3, value: "155" },
    { id: 4, value: "156" },
    { id: 5, value: "157" },
    { id: 6, value: "158" },
    { id: 7, value: "159" },
  ];

  const [selectedUtility, setSelectedUtility]=useState(null);

  const handleUtilityChange=(event)=>{
    const utilityid= event.target.value;
    setSelectedUtility(utilityid);
  }

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-100">
            <h1>PCM Meeting Recommendations and compliance</h1>
            <div className="date-sec row">
              <div className="col-md-2">
                <TextField
                  id="outlined-select-utility"
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

            {selectedUtility? (<div>{selectedUtility.toUpperCase()}</div>):(<p>Please select a utility to view the PCM Meeting Recommendations and Compliance</p>)}
          </div>
        </main>
      </div>
    </>
  );
};

export default PCMRecommendations;
