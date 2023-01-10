import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Loved() {
  const [lovedImgsFromHome, setLovedImgsFromHome] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate()

  useEffect(()=>{
    const _userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserInfo(_userInfo);
    if(!_userInfo){
      showAlertNotLogin()
    } else {
      getLovedImagesInApp();
    }
  },[]);
  
  function showAlertNotLogin(){
    Swal.fire({
      icon: 'error',
      title: 'You are not login!',
      text: 'Go to login?',
    }).then(function () {
        // Redirect the user
        navigate('/Login')
      });
  }

  function getLovedImagesInApp(){
    let _lovedImgsFromHome = JSON.parse(localStorage.getItem("lovedImgs"));
    setLovedImgsFromHome(_lovedImgsFromHome);
  }
  return (
    <div  className={lovedImgsFromHome?.state? "pt-5 homePage" : "pt-5 homePage1"}>
      <div className="container pt-5">
        <div className="images row m-auto mt-3">
          {lovedImgsFromHome?.state
            ? lovedImgsFromHome.data.map((pic, idx) => {
                return (
                  <div className="col-md-3 imageCard" key={idx}>
                    <div>
                      <img
                        src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                        alt={pic.title}
                      />
                    </div>
                    {/* <button className="loveBtn" onClick={()=>loved(pic.id)}>
                    {pic.flagIcons ? <i className="fa-solid fa-heart"></i>
                    :<i className="fa-regular fa-heart"></i>
                    }
                  </button> */}
                  </div>
                );
              })
            : <p className="textMsg"> No Images in Loved Page </p>}
        </div>
      </div>
    </div>
  );
}

export default Loved;
