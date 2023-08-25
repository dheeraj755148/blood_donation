import React from 'react'
import '../../style/sidebar.css'
import { Link } from 'react-router-dom'
import Logo from '../../images/Group 46.svg'
function SideBar() {
  return (
    <aside className="side-bar">
      <div className="menu-items main-heading">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="menu-items">
        <Link to="/">Dashboard</Link>
      </div>
      <div className="menu-items">
        <Link to="/donor">Donors</Link>
      </div>
      {/* <div className="menu-items">
        <Link to="/patient">Patients</Link>
      </div> */}
    </aside>
  )
}

export default SideBar
