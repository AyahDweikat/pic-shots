import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../Context/Context";
import './Navbar.scss'
function Navbar() {
  const [userInfo, setUserInfo] = useState({});
  const [isLogIn, setIsLogin] = useState(false);
  const location =  useLocation();
  useEffect(()=>{
    const _userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserInfo(_userInfo);
    if(_userInfo){
      setIsLogin(true);
    }
  },[location]);
  function onLogout(){
    if (isLogIn) {
      localStorage.removeItem("userinfo");
      setUserInfo({});
      setIsLogin(false);
    } else {
      Navigate("./login");
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            PIC SHOTS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="loved">
                  Loved
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {isLogIn? <span className="userName">Hello {userInfo.userName} </span> :""}
                {isLogIn? 
                <Link className="nav-link" to="/login" onClick={onLogout}>
                  Logout
                </Link>
                :
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
