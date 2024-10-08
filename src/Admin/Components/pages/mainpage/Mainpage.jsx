import React from 'react'
import './mainpage.scss';
import { Link } from 'react-router-dom';
import { Modal, Button } from '@mui/material';
// import SessionTimer from '../../Service/SessionTimer';

const Mainpage = () => {
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);
  return (
    <div>
      {/* <SessionTimer/> */}
      <main id="main" class="main">

        <div class="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section class="section dashboard">
          <div class="row">


            <div class="col-lg-12">
              <div class="row">
                <div class="col-xxl-4 col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <p class="card-title">Dear,<spna>{user.r_name}</spna></p>

                      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
                          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
                          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" class="active" aria-current="true"></button>
                        </div>
                        <div class="carousel-inner">
                          <div class="carousel-item">
                            <img src="../../assets/img/slides-1.jpg" class="d-block w-100 hero-img" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                              <h5>Welcome to the our family!</h5>
                              <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                            </div>
                          </div>
                          <div class="carousel-item">
                            <img src="../../assets/img/slides-2.jpg" class="d-block w-100 hero-img" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                              <h5>Welcome to the Ornate family!</h5>
                              <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                            </div>
                          </div>
                          <div class="carousel-item active">
                            <img src="../../assets/img/slides-3.jpg" class="d-block w-100 hero-img" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                              <h5>Welcome to the Ornate family!</h5>
                              <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                            </div>
                          </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div class="card cr-box">
                <img src="../../assets/img/userdashboard.jpg" className="card-img-top" alt="..." />
                <div class="card-body c1">
                  <h5 class="card-title">User</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card cr-box">
                <img src="../../assets/img/cms2.jpg" class="card-img-top" alt="..." />
                <div class="card-body c2">
                  <h5 class="card-title">CMS</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card cr-box">
                <img src="../../assets/img/footer.png" class="card-img-top" alt="..." />
                <div class="card-body c3">
                  <h5 class="card-title">Footer</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Link to='/createwhatsnew' class="card cr-box">
                <img src="../../assets/img/whatsnew.png" class="card-img-top" alt="..." />
                <div class="card-body c4">
                  <h5 class="card-title">Whats New</h5>
                </div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Link  to='/banner'class="card cr-box ">
                <img src="../../assets/img/banner1.png" class="card-img-top" alt="..." />
                <div class="card-body c5">
                  <h5 class="card-title">Banner</h5>

                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <div class="card cr-box">
                <img src="../../assets/img/link2.png" class="card-img-top" alt="..." />
                <div class="card-body c6">
                  <h5 class="card-title">Related Links</h5>

                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Link to='/profile' class="card cr-box">

                <img src="../../assets/img/profile.png" class="card-img-top" alt="..." />

                <div class="card-body c7">
                  <h5 class="card-title">Profile</h5>

                </div>

              </Link>
            </div>
            <div className="col-md-3">
              <Link to='/profile' class="card cr-box ">
                <img src="../../assets/img/contact.png" class="card-img-top" alt="..." />
                <div class="card-body c8">
                  <h5 class="card-title">Contact Us</h5>

                </div>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Mainpage