// import React,{useEffect} from 'react';
import React, { useState ,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Sidebar.scss';
import apiClient from "../../../Api/ApiClient";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const userData = localStorage.getItem('user');
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);
  const email = user.r_email;

  const handleLogout = async () => {
    try {
      const response = await apiClient.post('/api/Login/logout?email='+email);
     
      if (response.status === 200){
        localStorage.clear();
        navigate('/login');
      }
    
    } catch (error) {
      console.log('Error:', error);
    }
    
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    // Toggle the 'toggle-sidebar' class on the body
    document.body.classList.toggle('toggle-sidebar', !sidebarVisible);
  };


  return (
    <div>

{/* <!-- ======= Sidebar ======= --> */}
<div className="icon-bar"  style={{}} onClick={toggleSidebar}><i class="bi bi-list toggle-sidebar-btn"></i></div>
  <aside id="sidebar" className={`sidebar ${sidebarVisible ? '' : 'collapsed'}`}>

    <ul class="sidebar-nav" id="sidebar-nav">
    <li class="nav-heading">Main</li>
      <li class="nav-item">
        <Link to='/dashboard' class="nav-link ">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li class="nav-heading">List</li>
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
          <Link to='/user' style={{textDecoration:"none"}}>
              <i class="bi bi-circle"></i><span>All Users</span>
              </Link>
          </li>
          <li>
            <Link to='/user/createuser' style={{textDecoration:"none"}}>
              <i class="bi bi-circle"></i><span>Add new user</span>
              </Link>
          </li>
         
        </ul>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
          <i class="bi bi-journal-text"></i><span>CMS</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            < Link to='/cms/homepage'>
              <i class="bi bi-circle"></i><span>Create Home</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/aboutustable'>
              <i class="bi bi-circle"></i><span>Create About Us</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/menu'>
              <i class="bi bi-circle"></i><span>Menu</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/submenu'>
              <i class="bi bi-circle"></i><span>SubMenu</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/allmenu'>
              <i class="bi bi-circle"></i><span>All Menu</span>
            </Link>
          </li>
         
        </ul>
      </li>
      
      <li class="nav-item">
              <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                <i class="bi bi-journal-text"></i><span>CUSTOM</span><i class="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="forms-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                
                <li>
                  < Link to='/custom/custom'>
                    <i class="bi bi-circle"></i><span>Add Custom</span>
                  </Link>
                </li>
                <li>
                < Link to='/custom/allcustomdata'>
                    <i class="bi bi-circle"></i><span>Custom Data</span>
                  </Link>
                </li>
                

              </ul>
            </li>
      {/* <li class="nav-item">
        <a class="nav-link collapsed one" data-bs-target="#tables-form-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-layout-text-window-reverse one"></i><span>Forms</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="tables-form-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to='/form/formone'>
              <i class="bi bi-circle"></i><span>Form one</span>
            </Link>
          </li>
          <li>
            <Link to='/form/formtwo'>
              <i class="bi bi-circle"></i><span>Form two</span>
            </Link>
          </li>
          <li>
            <Link to='/form/formthree'>
              <i class="bi bi-circle"></i><span>Form three</span>
            </Link>
          </li>
          <li>
            <Link to='/form/formfour'>
              <i class="bi bi-circle"></i><span>Form four</span>
            </Link>
          </li>
        </ul>
      </li> */}
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-layout-text-window-reverse"></i><span>Footer</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to='/footer/createfooterdisc'>
              <i class="bi bi-circle"></i><span>Footer Description</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/createfooteraddress'>
              <i class="bi bi-circle"></i><span>Footer Address</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/createfooterservices'>
              <i class="bi bi-circle"></i><span>Footer Services</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/createfooterdata'>
              <i class="bi bi-circle"></i><span>Footer Data</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/footertable'>
              <i class="bi bi-circle"></i><span>All Footer</span>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-bar-chart"></i><span>Services</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
            <Link to='/services/allwhatsnew' >
              <i class="bi bi-circle"></i><span>Create Latest update</span>
            </Link>
          </li>
          <li activeClassName="active">
            <Link to='/services/alltender' >
              <i class="bi bi-circle"></i><span>Create Tender</span>
            </Link>
          </li>
          <li>
            <Link to='/services/allreport' >
              <i class="bi bi-circle"></i><span>Create Report</span>
            </Link>
          </li>
          <li>
            <Link to='/services/alllink' >
              <i class="bi bi-circle"></i><span>Create Links</span>
            </Link>
          </li>
          <li>
            <Link to='/services/commericaltable' >
              <i class="bi bi-circle"></i><span>Create Commerical</span>
            </Link>
          </li>
         
        </ul>
      </li>

  
       <li class="nav-item">
        <Link to='/banner' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Banner</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to='/form/formdata' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Form Data</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to='/slider' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Slider</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to='/candidate/candidatetable' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Candidate</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to='/newpassword' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Create New Password</span>
        </Link>
      </li>

      <li class="nav-heading">Users</li>

      {/* <li class="nav-item">
      <Link to='/Profile' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Profile</span>
      </Link>
      </li> */}
{/* 
      <li class="nav-item">
        <Link to='/sitemap
        ' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Site Map</span>
        </Link>
      </li> */}

      {/* <li class="nav-item">
        <a class="nav-link collapsed" href="pages-contact.html">
          <i class="bi bi-envelope"></i>
          <span>Contact</span>
        </a>
      </li> */}
      <li class="nav-item">
        <Link to='/' class="nav-link collapsed"  onClick={handleLogout}>
          <i class="bi bi-box-arrow-in-right"></i>
          <span>Logout</span>
        </Link>
      </li>

      
    

    </ul>

  </aside>


    </div>
  )
}

export default Sidebar