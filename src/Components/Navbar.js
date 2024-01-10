import React, { useContext }  from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import noteContext from "../Context/Note/NoteContext";

const Navbar = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const context = useContext(noteContext);
  const { openProfile, setOpenProfile } = context;
  const handleOpen=  ()=>{
    console.log("handleOpen called.....")
    if(!openProfile){
    setOpenProfile(true)}
  }
  return (
    // <nav className="navbar navbar-expand-lg  border-bottom border-body" style={{backgroundColor: 'rgb(178 214 241)'}}>
    <nav className='navbar navbar-expand-lg navbar-light bg-light' style={{ border: '1px solid rgba(0, 0, 0, 0.0)', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.4)', backgroundColor: 'black' }}>
      <div className="container-fluid">
        <strong>
          <Link className="navbar-brand" to="/">iNotebook</Link></strong>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} fw-normal`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} fw-normal`} to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form> : <div className='d-flex align-items-center'>  <button type="button" onClick={handleLogout} className="btn btn-sm btn-outline-secondary mr-3">Logout</button>  <Link className='nav-link active px-0 py-2' to="" onClick={handleOpen}><i className="fa-solid fa-user mr-1"></i>Profile</Link> </div>}

        
        </div>
      </div>
    </nav>
  )
}

export default Navbar