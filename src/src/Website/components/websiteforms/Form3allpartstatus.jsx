import React, { useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import TextField from "@mui/material/TextField";
import { MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CmsFooter } from "../Footer/CmsFooter";
const Form3allpartsdata = () => {
  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 ">
            <h2>TPPA Observations/descripancies</h2>
            <div className="date-sec row">
              <div className="col-md-4">

                <h5>Form3 parts</h5>
                <p>Part1</p>
                {/* <p>Part2</p> */}
                <p>Part3</p>
                {/* <p>Part4</p> */}
                {/* <p>Part4</p> */}
              </div>
              <div className="col-md-4">

                <h5>Status of form3 all parts</h5>
                <p><a href='form3part1list'>View List</a></p>
                {/* <p><a href='form3part2'>View List</a></p> */}
                <p><a href='form3part2list'>View List</a></p>
                {/* <p><a href='form1part4list'>Fill Form</a></p> */}
                {/* <p><a href='form1part5list'>View List</a></p> */}
              </div>
              <div className="col-md-2">
                <Link to="/form3part1">
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Add New Record
                  </Button>
                </Link>
              </div>
            </div>

          </div>
          <CmsFooter />
        </main>

      </div>
    </>
  );
};

export default Form3allpartsdata;
