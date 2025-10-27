import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Img from '../../../assets/AdminAssets/img/profile-img.jpg'
// import Img1 from '../../assets/img/logo.png'
import Img1 from '../../../assets/images/avtar.png'
import apiClient from '../../../Api/ApiClient'
const Header = () => {

  const storedUserString = localStorage.getItem("user");
  const user = storedUserString ? JSON.parse(storedUserString) : {};
  const last_login = user?.last_login || "Not available";



//const email = user.r_email  
const email = user.email_result
  const navigate = useNavigate();
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

  return (
    <div className='body'>


      <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
          <Link to='/dashboard' class="logo d-flex align-items-center">
            {/* <img src={Img1} alt="" /> */}
            <span class="d-none d-lg-block">Western Regional Power Committee</span>
          </Link>
        </div>
      

        <nav class="header-nav ms-auto">
          
          <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
              <a class="nav-link nav-icon search-bar-toggle ">
                <i class="bi bi-search"></i>
              </a>
            </li>

           

            <li class="nav-item dropdown">

             

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              

              </ul>

            </li>

            <li class="nav-item dropdown pe-3">

              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={Img1} alt="Profile" class="rounded-circle" />
                <span class="d-none d-md-block dropdown-toggle ps-2">{user.r_name}</span>
              </a>
  <li className="dropdown-item-text text-center">
                <small className="text-muted">Last Active: {last_login}</small>
              </li>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6> {user.r_name}</h6>
                  <span>{user.usertype}</span>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

               
                <li>
                  <hr class="dropdown-divider" />
                </li>

            
                <li>
                  <hr class="dropdown-divider" />
                </li>

             

                <li >
                  <Link to='/' class="dropdown-item d-flex align-items-center" onClick={handleLogout} >
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </Link>

                </li>

              </ul>
            </li>

          </ul>
        </nav>

      </header>

    </div>
  )
}

export default Header