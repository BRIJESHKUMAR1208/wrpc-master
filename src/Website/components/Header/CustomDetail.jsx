import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContent } from "./getContent";
import CmsDisplay from "./CmsDisplay";
import apiClient from '../../../Api/ApiClient';
import api from '../../../Api/api.json';
import { CmsFooter } from "../Footer/CmsFooter";
import { getMenuoptinsById } from "../../../Api/ApiFunctions";
import axios from "axios";
import { TopHeader } from "../TopHeader/TopHeader";
import { Errorfound } from "../error404/Errorfound";
// import CircularProgress from '@material-ui/core/CircularProgress';
//import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   center: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh', // Adjust this value to center vertically within the viewport
//   },
//   loader: {
//     fontSize: '5rem', // Adjust this value to increase the size of the loader
//   },
// }));


const CustomDetail = ({ currentPage }) => {
  const [Menuoptions, setMenuData] = useState(null); // Initialize as null or an empty object
  const [extractedNumber, setExtractedNumber] = useState(null);
  const { id } = useParams();
  //const classes = useStyles();

  useEffect(() => {


    if (id) {

      async function fetchMenuData() {
        try {
          //const data = await getMenuoptinsById(number);//getmenudatabyid
          const response = await apiClient.get(`${api.getcustomdatabyid}${id}`);
          setMenuData(response.data);
          //setMenuData(data.data);
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      }

      fetchMenuData();
    }
  }, [id]);
  console.log(Menuoptions);
  if (Menuoptions === null) {
    return (
      <>
        <TopHeader />
        <CmsDisplay />
        {/* <div className={classes.center}>
       <CircularProgress size={100} className={classes.loader} />
    </div> */}
        <CmsFooter />
      </>
    );
  }

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />

        <div class="row">
          <div class="breadcrumbs custom-banner d-flex align-items-center">
            <div class="container position-relative d-flex flex-column align-items-center aos-init aos-animate" data-aos="fade">
              <h2>{Menuoptions.menuname}</h2>
              {/* <ol>
<li><a href="/">Home</a></li>
<li>{Menuoptions.menuname}</li>
</ol> */}
            </div>
          </div>
        </div>

        <main className="inner-body">
          <section class="py-3 py-md-5">
            <div class="container">
              <div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                <div class="col-12 col-lg-12 ">
                  {getContent(
                    Menuoptions.menu_id,
                    Menuoptions.menuurl,
                    Menuoptions.contenttype,
                    Menuoptions.html,
                    Menuoptions.file,
                    Menuoptions.internal_link,
                    Menuoptions.external_link
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <CmsFooter />
      </div>
    </>
  );
};

export default CustomDetail;
