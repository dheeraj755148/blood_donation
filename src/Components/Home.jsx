import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import SideBar from './sub_component/sidebar'
import '../style/home.css'
import Widjets from './Widgets'
import BloodType from './BloodType'

function Home() {
  const { user, getDonorData } = useAuth()

  return (
    <div className="home-page">
      {/* <SideBar /> */}
      <div className="container">
        <div className="row">
          <BloodType />
          <div className="col-lg-12">
            <div className="col-lg-6">
              {/* <Widjets /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
