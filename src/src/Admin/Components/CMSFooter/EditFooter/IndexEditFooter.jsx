import React, { useState, useEffect } from 'react';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import { Link, Navigate, useParams } from 'react-router-dom';
import { EditFooterServices } from './EdirFooterServices';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import { EditFooterData } from './EditFooterData';
import { EditFooterDec } from './EditFooterDec';
import { EditFooterAddress } from './EditFooterAddress';



export const IndexEditFooter = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  useEffect(() => {
    async function fetchData() {
      try {

        const response = await apiClient.get(apis.getfooterbyid + id);
        setData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    }
    fetchData();
  }, [id]);
  return (
    <div>
      <div>

        <div>
          <Header />
          <Sidebar />
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Create Footer</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Footer</li>
                  <li className="breadcrumb-item active">Create Footer Address</li>
                </ol>
              </nav>
            </div>
            <div className="pagetitle-rgt d-flex justify-content-end mb-5">
              <Link to="/footer/footertable">
                <button type="button" class="btn btn-info">
                  Back
                </button>
              </Link>
            </div>
            {data.footertype === 1 && (
              <EditFooterDec />
            )}
            {data.footertype === 2 && (
              <EditFooterServices />
            )}
            {data.footertype === 3 && (
              <EditFooterAddress />
            )}
            {data.footertype
              === 4 && (
                <EditFooterData />
              )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}


