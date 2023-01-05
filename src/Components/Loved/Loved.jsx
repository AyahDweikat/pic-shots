import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Loved() {
  const [lovedImgsFromHome, setLovedImgsFromHome] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const location = useLocation()

  useEffect(()=>{
    const _userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserInfo(_userInfo);
    if(!_userInfo){
      return alert('You are not login, so there is no images in loved folder');
      // setErrorMsg("You are not login, please log in so you can saved images in loved folder");
    } else {
      getLovedImagesInApp();
    }
  },[]);

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
