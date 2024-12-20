import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import '../SiteMap/siteMap.scss'; // Import the CSS file

const SiteMap = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <main id="main" className="main site-map">
            <div class="card"><div class="card-body"><div class="mb-3 mt-md-4">
           
                <div className="pagetitle">
                    <div class="text-ce"><h3>Sitemap</h3></div>
                    {/*<nav>*/}
                    {/*    <ol className="breadcrumb" style={{ textAlign: 'left' }}>*/}
                    {/*        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>*/}
                    {/*    </ol>*/}
                    {/*</nav>*/}
                    <div style={{ textAlign: 'left' }}>
                        <h1>Dashboard:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                        <h1>User Links:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/user">All User</Link></li>
                            <li><Link to="/user/createuser">Add New User</Link></li>
                        </ul>
                        <h1>CMS Links:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/user/createuser">Create Home</Link></li>
                            <li><Link to="/cms/menu">Mean</Link></li>
                            <li><Link to="/cms/submenu">SubMenu</Link></li>
                            <li><Link to="/cms/allmenu">All Menu</Link></li>
                        </ul>
                        <h1>Footer Links:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/footer/createfooterdisc">Create Footer Description</Link></li>
                            <li><Link to="/footer/createfooteraddress">Footer Address</Link></li>
                            <li><Link to="/footer/createfooterservices">Footer Services</Link></li>
                            <li><Link to="/footer/createfooterdata">Footer Data</Link></li>
                            <li><Link to="/footer/footertable">All Footer</Link></li>
                        </ul>
                        <h1>Services Links:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/services/allwhatsnew">Create Latest Update</Link></li>
                            <li><Link to="/services/alltender">Create Tender</Link></li>
                            <li><Link to="/services/allreport">Create Report</Link></li>
                            <li><Link to="/services/alllink">Create Links</Link></li>
                        </ul>
                        <h1>Banner:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/banner">Banner</Link></li>
                        </ul>
                        <h1>Slider:</h1>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            <li><Link to="/slider">Slider</Link></li>
                        </ul>
                    </div>
                </div>
         
            
            </div>
            </div>
            </div>
            </main>
        </div>
    )
}

export default SiteMap;
