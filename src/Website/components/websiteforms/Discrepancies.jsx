import React, { useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

const Discrepancies = () => {
  const utilities = [
    { id: 1, label: "MSETCL" },
    { id: 2, label: "MPPTCL" },
    { id: 3, label: "GETCO" },
    { id: 4, label: "CSPTCL" },
    { id: 5, label: "GED (Goa) " },
    { id: 6, label: "DD" },
    { id: 7, label: "DNH" },
    { id: 8, label: "GSECL" },
    { id: 9, label: "POWER GRID WR1" },
    { id: 10, label: "POWER GRID WR2" },
    { id: 11, label: "NTPC" },
    { id: 12, label: "KAPS 1&2 " },
    { id: 13, label: "KAPS 3&4 " },
    { id: 14, label: "TAPS 1&2 " },
    { id: 15, label: "TAPS 3&4" },
  ];

  const [utility, setutility]= useState(null);

  const handleChange=(event)=>{
    const utilityid=event.target.value;
    setutility(utilityid);
  }

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-100">
            <h1>Discrepancies</h1>
            <div className="date-sec row">
              <div className="col-md-5">
                <TextField
                  id="outlined-select-utility"
                  select
                  label="Utility"
                  fullWidth
                  size="normal"
                  value={utility}
                  onChange={handleChange}
                >
                  {utilities.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-5">
                <TextField
                  id="outlined-select-utility"
                  select
                  label="Substation"
                  fullWidth
                  size="normal"
                ></TextField>
              </div>
            </div>
            
            {utility?(<><div>
                <h4>Category-A Observations</h4>
            </div>
            <div>
                <h4>Category-B Observations</h4>
                </div>
            </>
        ):(<p>Please select a utility to view the category-wise discrepancy data.</p>)}
          </div>
        </main>
      </div>
    </>
  );
};

export default Discrepancies;
