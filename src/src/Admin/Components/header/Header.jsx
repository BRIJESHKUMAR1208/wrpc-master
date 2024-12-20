import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Img from '../../../assets/AdminAssets/img/profile-img.jpg'
// import Img1 from '../../assets/img/logo.png'
import Img1 from '../../../assets/images/avtar.png'
import apiClient from '../../../Api/ApiClient'
const Header = () => {

  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);
const email = user.r_email
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

              {/* <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i class="bi bi-bell"></i>
            <span class="badge bg-primary badge-number">4</span>
          </a> */}

              {/* <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li class="dropdown-header">
              You have 4 new notifications
              <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
            </li>
            <li>
              <hr class="dropdown-divider"/>
            </li>

            <li class="notification-item">
              <i class="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider"/>
            </li>

            <li class="notification-item">
              <i class="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider"/>
            </li>

            <li class="notification-item">
              <i class="bi bi-check-circle text-success"></i>
              <div>
                <h4>Sit rerum fuga</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>2 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider"/>
            </li>

            <li class="notification-item">
              <i class="bi bi-info-circle text-primary"></i>
              <div>
                <h4>Dicta reprehenderit</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>4 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr class="dropdown-divider"/>
            </li>
            <li class="dropdown-footer">
              <a href="#">Show all notifications</a>
            </li>

          </ul> */}

            </li>

            <li class="nav-item dropdown">

              {/* <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i class="bi bi-chat-left-text"></i>
            <span class="badge bg-success badge-number">3</span>
          </a> */}

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              

              </ul>

            </li>

            <li class="nav-item dropdown pe-3">

              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={Img1} alt="Profile" class="rounded-circle" />
                <span class="d-none d-md-block dropdown-toggle ps-2">{user.r_name}</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6> {user.r_name}</h6>
                  <span>{user.usertype}</span>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                {/* <li>
                  <Link class="dropdown-item d-flex align-items-center" to='/Profile'>
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li> */}
                <li>
                  <hr class="dropdown-divider" />
                </li>

            
                <li>
                  <hr class="dropdown-divider" />
                </li>


                <li>
                  {/* <hr class="dropdown-divider"/> */}
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