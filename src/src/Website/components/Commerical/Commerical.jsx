import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCommerical, BASE_URL } from "../../../Api/ApiFunctions";

export const Commerical = () => {
  const [commerical, SetCommerical] = useState([]);
  const [archivedCommericalData, setArchivedCommericalData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      try {
        const linkData = await getCommerical();

        const currentDate = new Date();

        // Filter and archive link data
        const filteredLinkData = linkData.filter(
          (item) => new Date(item.endDate) >= currentDate
        );
        const archivedLinkData = linkData.filter(
          (item) => new Date(item.endDate) < currentDate
        );

        // Set filtered data and archive archived data
        SetCommerical(filteredLinkData);

        // Set archived data
        setArchivedCommericalData(archivedLinkData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);

  
  return (
    <div>
      <div>
        <table border="0" cellspacing="1" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <table class="table table-striped table-bordered border border-dark">
                  <thead>
                    <tr>
                      <td class="p-4">
                        <ul class="nav nav-pills" id="tabs">
                          <li class="nav-item">
                            <a
                              role="button"
                              class="nav-link active"
                              onclick="renderDataForYear('2024')"
                            >
                              2024
                            </a>
                          </li>
                       
                          
                          <li class="nav-item">
                            <a
                              role="button"
                              class="nav-link "
                              onclick="renderDataForYear('REVISIONS')"
                            >
                              REVISIONS
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </thead>
                  <tbody id="content">
                    <tr colspan="2">
                      <td>
                        <p align="center" class="style3">
                          <a
                            href="javascript:void(0);"
                            target="_parent"
                            onclick="renderBulkData('29.01.24,04.02.24,week=5&amp;yy=Jan24,13.02.24,O', 'sum');"
                          >
                            <font
                              size="2"
                              face="Verdana, Arial, Helvetica, sans-serif"
                            >
                              <span>
                                <span class="style2">
                                  Week from 29.01.24 to 04.02.24 ( Issued on
                                  13.02.24 )
                                </span>
                              </span>
                            </font>
                          </a>
                        </p>
                      </td>
                      <td>
                        <p align="center" class="style3">
                          <a
                            href="javascript:void(0);"
                            target="_parent"
                            onclick="renderBulkData('29.01.24,04.02.24,week=5&amp;yy=Jan24,13.02.24,O', 'blk96');"
                          >
                            <font
                              size="2"
                              face="Verdana, Arial, Helvetica, sans-serif"
                            >
                              <span>
                                <span class="style2">
                                  All Member BlockWise Data
                                </span>
                              </span>
                            </font>
                          </a>
                        </p>
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
