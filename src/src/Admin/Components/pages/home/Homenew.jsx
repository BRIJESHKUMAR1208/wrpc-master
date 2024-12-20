import React from 'react'
import "./home.scss"
import Header from '../../../Components/header/Header'
import { Slider } from '@mui/material'
import Footer from '../../../Components/footer/Footer'
// import Footer from '../../../Components/footer/Footer'
import Sidebar from '../../../Components/sidebar/Sidebar'
import Mainpage from '../mainpage/Mainpage';


const Homenew = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Mainpage />
      <Footer />
    </div>
  )
}

export default Homenew
