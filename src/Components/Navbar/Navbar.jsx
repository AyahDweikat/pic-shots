import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { GlobalContext } from "../../Context/Context";
import './Navbar.scss'
function Navbar() {
  const {auth} = useContext(GlobalContext);
  console.log(auth);
  function onLogout(){
    if (auth.user) {
      auth.signout();
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
                {auth.user? <span className="userName">Hello {auth.user.name} </span> :""}
                {/* <Link className="nav-link" to="/login">
                  Login
                  {auth.user? "Logout":"Login"}
                </Link> */}
                {auth.user? 
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
