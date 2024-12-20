import React, { useState, useEffect } from 'react';

import { EditMenu } from './EditMenu';
import { EditSubmenu } from './EditSubmenu';

import { Link, useParams } from 'react-router-dom';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';



export const Index = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  useEffect(() => {
    async function fetchData2() {
      try {

        const response = await apiClient.get(apis.getmenudatabyid + id);
        setData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    }
    fetchData2();
  }, [id]);
 
  return (
    <div >
      <Header />
      <Sidebar />
      <main id="main" class="main">

        <div class="pagetitle">
          <h1>Edit Menu</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Dashboard</li>
              <li class="breadcrumb-item  ">CMS</li>
              <li class="breadcrumb-item active ">Edit Menu</li>

            </ol>
          </nav>
        </div>
        <div className="pagetitle-rgt">
                        <Link to="/cms/allmenu">
                            <button type="button" class="btn btn-info">
                                Back
                            </button>
                        </Link>
                    </div>

        <div >

          <div>
            {data.submenu_id === 0 && (
              <EditMenu />
            )}
            {data.submenu_id !== 0 && (
              <EditSubmenu />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


