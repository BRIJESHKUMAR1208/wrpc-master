import React, { useEffect, useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../Footer/CmsFooter";
import { CSmartTable } from "@coreui/react-pro";

const PlanMonitoring = () => {
  const [data, setData] = useState([]);

  const columns = [
    { key: "s_no", label: "S.No.", _props: { scope: "col" }, sorter: false },
    {
      key: "stateTeam",
      label: "State Team",
      _props: { colSpan: 2, scope: "colgroup" },
      _style: { width: "20%", textAlign:"center" },
      sorter: false,
    },
    {
      key: "stateAudited",
      label: "State to be audited",
      _props: { scope: "col" },
      _style: { width: "17%", textAlign:"center" },
      sorter: true,
    },
    {
      key: "substation",
      label: "Name of Substation",
      _props: { scope: "col" },
      _style:{textAlign:"center"},
      sorter: false,
    },
    {
      key: "monthOfAudit",
      label: "Month of Audit",
      _props: { scope: "col" },
      _style: { width: "15%", textAlign:"center"},
      sorter: true,
    },
    { key: "status", label: "Status", _props: { scope: "col" }, sorter: false, _style:{textAlign:"center"} },
  ];

  const items = [
    {
      stateTeam: ["Chhattisgarh", "CS-A"],
      stateAudited: "Maharashtra",
      substation: "400kV Chandrapur",
      monthOfAudit: "December",
      status: "Protection Audit Completed on 17.01.2024 - 18.01.2024.",
    },
    {
      stateTeam: ["Gujarat", "GJ-A"],
      stateAudited: "Maharashtra",
      substation: "400kV Alkud",
      monthOfAudit: "December",
      status: "Protection Audit Completed on 18.12.2023 - 21.12.2023",

    },
    {
      stateTeam: ["Maharashtra", "MH-A"],
      stateAudited: "Madhya Pradesh",
      substation: "400kV Ashta",
      monthOfAudit: "December",
      status: "Protection Audit Completed on 26.12.2023 - 30.12.2023.",
    },
    {
      stateTeam: ["Maharashtra", "MH-F"],
      stateAudited: "Gujarat",
      substation: "400kV Wanakbori (GIS)",
      monthOfAudit: "December",
      status: "Protection Audit Completed on 17.01.2024 - 18.01.2024.",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-E"],
      stateAudited: "Gujarat",
      substation: "400kV Ukai",
      monthOfAudit: "December",
      status: "Protection Audit started on dt. 23.01.2024 - 27.01.2024",
    },
    {
      stateTeam: ["Chhattisgarh", "CS-B"],

      stateAudited: "Maharashtra",
      substation: "400kV Chandrapur GCR",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 30.01.2024 -31-.01.2024",
    },
    {
      stateTeam: ["Gujarat", "GJ-B"],
      stateAudited: "Maharashtra",
      substation: "400kV Khadaka (Bhusawal)",
      monthOfAudit: "January",
      status: "Protection Audit Completed on dt. 01.02.2024-02.02.2024",
    },
    {
      stateTeam: ["Gujarat", "GJ-B"],
      stateAudited: "Maharashtra",
      substation: "400kV Nanded (Kumbhargaon)",
      monthOfAudit: "January",
      status: "Alloted to GETCO in the Month of July",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-A"],
      stateAudited: "Maharashtra",
      substation: "400kV Akola",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 09.01.2024 -12-.01.2024",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-B"],
      stateAudited: "Maharashtra",
      substation: "400kV Waluj",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 17.01.2024 -20-01.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-B"],
      stateAudited: "Madhya Pradesh",
      substation: "400kV Badnawar",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 22.01.2024 -26-01.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-C"],
      stateAudited: "Madhya Pradesh",
      substation: "400kV Bhopal",
      monthOfAudit: "January",
      status: "Protection Audit Completed on dt",
    },
    {
      stateTeam: ["Maharashtra", "MH-D"],
      stateAudited: "Madhya Pradesh",
      substation: "400kV Bina",
      monthOfAudit: "January",
      status: "Protection Audit Completed on dt.01.04.2024 to 03.04.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-E"],
      stateAudited: "Chhattisgarh",
      substation: "400kV Bhilai",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 16.01.2024 - 17.01.2024.",
    },
    {
      stateTeam: ["Maharashtra", "MH-F"],
      stateAudited: "Gujarat",
      substation: "400kV Pancham",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 12.03.2024 - 14.03.2024.",
    },
    {
      stateTeam: ["Maharashtra", "MH-G"],
      stateAudited: "Goa",
      substation: "220kV Amona",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 18.01.2024 - 19.01.2024",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-D"],
      stateAudited: "Chhattisgarh",
      substation: "400 kV Marwa",
      monthOfAudit: "January",
      status: "Protection Audit Completed on 09.01.2024 - 12.01.2024",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-E"],
      stateAudited: "Gujarat",
      substation: "Zerda(Kansari)",
      monthOfAudit: "January",
      status: "Protection Audit was completed on 31.12.2020 by private team",
    },
    {
      stateTeam: ["Chhattisgarh", "CS-A"],
      stateAudited: "Maharashtra",
      substation: "Chandrapur-II",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 23.04.2024-25.04.2024",
    },
    {
      stateTeam: ["Chhattisgarh", "CS-C"],
      stateAudited: "Maharashtra",
      substation: "Chandrapur HVDC",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 22.02.2024-23.02.2024",
    },
    {
      stateTeam: ["Gujarat", "GJ-A"],
      stateAudited: "Maharashtra",
      substation: "Chakan",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 05.02.2024-07.02.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-A"],
      stateAudited: "Madhya Pradesh",
      substation: "Chhegaon",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 19.02.2024 -20.02.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-B"],
      stateAudited: "Madhya Pradesh",
      substation: "Indore-MP",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 04.03.2024-06.03.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-G"],
      stateAudited: "Goa",
      substation: "Tivim",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 15.04.2024-16.04.2024",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-C"],
      stateAudited: "Maharashtra",
      substation: "Bableshwar",
      monthOfAudit: "February",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Madhya Pradesh", "MP-D"],
      stateAudited: "Chhattisgarh",
      substation: "Raita",
      monthOfAudit: "February",
      status: "Protection Audit Completed on dt. 11.03.2024-14.03.2024",
    },
    {
      stateTeam: ["CSPTCL", "CS-B"],
      stateAudited: "Maharashtra",
      substation: "Khaparkheda",
      monthOfAudit: "March",
      status: "Protection Audit Completed on dt. 21.03.2024-23.03.2024",
    },
    {
      stateTeam: ["GETCO", "GJ-B"],
      stateAudited: "Maharashtra",
      substation: "Parli-M",
      monthOfAudit: "March",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Maharashtra", "MH-C"],
      stateAudited: "Madhya Pradesh",
      substation: "Julwania",
      monthOfAudit: "March",
      status: "Protection Audit Completed on dt. 22.04.2024-25.04.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-D"],
      stateAudited: "Madhya Pradesh",
      substation: "Katni",
      monthOfAudit: "March",
      status: "Protection Audit Completed on dt. 04.04.2024 to 06.04.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-E"],
      stateAudited: "Chhattisgarh",
      substation: "Jagdalpur",
      monthOfAudit: "March",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Maharashtra", "MH-F"],
      stateAudited: "Gujarat",
      substation: "Ranchodpura",
      monthOfAudit: "March",
      status: "Protection Audit Completed on dt. 07.05.2024 to 09.05.2024",
    },
    {
      stateTeam: ["MPPTCL", "MP-A"],
      stateAudited: "Maharashtra",
      substation: "Deepnagar",
      monthOfAudit: "March",
      status: "Protection Audit Completed on dt. 04.03.2024-07.03.2024",
    },
    {
      stateTeam: ["MPPTCL", "MP-B"],
      stateAudited: "Maharashtra",
      substation: "Dhule-MS",
      monthOfAudit: "March",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-E"],
      stateAudited: "Gujarat",
      substation: "Bhachunda",
      monthOfAudit: "March",
      status: "Status may be updated",
    },
    {
      stateTeam: ["GETCO", "GJ-A"],
      stateAudited: "Maharashtra",
      substation: "Taptithanda",
      monthOfAudit: "March",
      status: "Status may be updated",
    },
    {
      stateTeam: ["CSPTCL", "CS-C"],
      stateAudited: "Maharashtra",
      substation: "Kolhapur",
      monthOfAudit: "April",
      status: "Status may be updated",
    },
    {
      stateTeam: ["GETCO", "GJ-A"],
      stateAudited: "Maharashtra",
      substation: "Sholapur-M",
      monthOfAudit: "April",
      status: "Protection Audit start from 27.06.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-A"],
      stateAudited: "Madhya Pradesh",
      substation: "Kirnapur",
      monthOfAudit: "April",
      status: "Protection Audit Completed on dt. 11.04.2024-13.04.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-B"],
      stateAudited: "Madhya Pradesh",
      substation: "Mandsaur",
      monthOfAudit: "April",
      status: "Protection Audit Completed on dt. 23.04.2024-25.04.2024",
    },
    {
      stateTeam: ["MPPTCL", "MP-A"],
      stateAudited: "Maharashtra",
      substation: "Koradi",
      monthOfAudit: "April",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-C"],
      stateAudited: "Maharashtra",
      substation: "Ektuni (Aurangabad(3))",
      monthOfAudit: "April",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-D"],
      stateAudited: "Chhattisgarh",
      substation: "Korba (W)",
      monthOfAudit: "April",
      status: "Status may be updated",
    },
    {
      stateTeam: ["CSPTCL", "CS-A"],
      stateAudited: "Maharashtra",
      substation: "Kudus",
      monthOfAudit: "May",
      status: "Status may be updated",
    },
    {
      stateTeam: ["GETCO", "GJ-B"],
      stateAudited: "Maharashtra",
      substation: "Lonikhand",
      monthOfAudit: "May",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Maharashtra", "MH-C"],
      stateAudited: "Madhya Pradesh",
      substation: "Nagda",
      monthOfAudit: "May",
      status: "Protection Audit start from 01.07.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-D"],
      stateAudited: "Madhya Pradesh",
      substation: "Pithampur",
      monthOfAudit: "May",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Maharashtra", "MH-E"],
      stateAudited: "Chhattisgarh",
      substation: "Kurud(Dhamtari)",
      monthOfAudit: "May",
      status: "Protection Audit Completed on dt. 11.06.2024 to 13.06.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-F"],
      stateAudited: "Gujarat",
      substation: "Vav(GIS)",
      monthOfAudit: "May",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-B"],
      stateAudited: "Maharashtra",
      substation: "Koradi-II",
      monthOfAudit: "May",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-D"],
      stateAudited: "Chhattisgarh",
      substation: "Korba (W)-Ext",
      monthOfAudit: "May",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Gujarat", "GJ-A"],
      stateAudited: "Maharashtra",
      substation: "Lonikhand-II",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-A"],
      stateAudited: "Maharashtra",
      substation: "Karad",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Maharashtra", "MH-A"],
      stateAudited: "Madhya Pradesh",
      substation: "Sagar",
      monthOfAudit: "June",
      status: "Protection Audit Completed on dt. 03.06.2024 to 06.06.2024",
    },
    {
      stateTeam: ["Maharashtra", "MH-B"],
      stateAudited: "Madhya Pradesh",
      substation: "Ujjain",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
    {
      stateTeam: ["Maharashtra", "MH-G"],
      stateAudited: "Goa",
      substation: "Xeldem",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-C"],
      stateAudited: "Maharashtra",
      substation: "Koyna stage-IV",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-C"],
      stateAudited: "Maharashtra",
      substation: "Nagothane",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
    {
      stateTeam: ["MPPTCL", "MP-E"],
      stateAudited: "Gujarat",
      substation: "Shapar",
      monthOfAudit: "June",
      status: "Status may be updated",
    },
  ];

  useEffect(() => {
    setData(items.map((item, index) => ({ ...item, s_no: index + 1 })));
  });

  return (
    <>
      <div>
        <div>
          <TopHeader />
        </div>
        <CmsDisplay />
        <main>
          <div className="container mt-5 mb-5">
            <h4>Plan Monitoring</h4>
            <CSmartTable
              columnSorter
              columns={columns}
              items={data}
              itemsPerPage={60}
              tableFilter
              tableProps={{
                hover: true,
                className: "text-center",
                responsive:true,
              }}
              scopedColumns={{
                stateTeam: (item) => (
                  <>
                    {item.stateTeam.map((_item) => (
                      <td>{_item}</td>
                    ))}
                  </>
                ),
              }}
            />
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};

export default PlanMonitoring;
