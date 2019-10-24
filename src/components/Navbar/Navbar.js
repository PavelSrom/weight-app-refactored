import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => (
  <div className="navigation bg-primary container-fluid">
    <Link to="/me"><i className="fas fa-home"></i></Link>
    <Link to="/me/logs"><i className="fas fa-chart-line"></i></Link>
    <Link to="/exercises"><i className="fas fa-running"></i></Link>
    <Link to="/me/details"><i className="fas fa-user-cog"></i></Link>
  </div>
)

export default Navbar