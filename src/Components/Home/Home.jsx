import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../Context/Context";
import { apiKey, ImageSearch } from "../../Utils/ApiUtils";
import "./Home.scss";

function Home() {
  const [query, setQuery] = useState("mountains");
  const [noImgsMsg, setNoImgsMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [lovedImg, setLovedImg] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  function searchData(e) {
    setQuery(e.target.value);
  }

  async function getImages(e) {
    e.preventDefault();
    setQuery("");
    setImages([]);
    let data = await ImageSearch(query, 100, apiKey);
    if (data.stat === "ok" && data.photos.pages) {
      data.photos.photo.map((item)=>{
        item.flagIcons = false;
      })
      setFlag(true);
      setImages(data.photos.photo);
    } else {
      setFlag(false);
      setNoImgsMsg("No Results coming from this search");
    }
  }
  function loved(id){
    if(!userInfo){
      alert('You are not login, please log in so you can saved images in loved folder');

      setErrorMsg("You are not login, please log in so you can saved images in loved folder");
      return 0;
    }
    let _images = [...images];
    let _lovedImg = [...lovedImg];
    _images.map((pic)=>{
      if(pic.id === id){
        if(pic.flagIcons === false){
          _lovedImg.push(pic);
          setLovedImg(_lovedImg);
        } 
        else 
        {
          let __filteredArr = _lovedImg.filter((item)=>{
            return item.id !==id;
          })
          setLovedImg(__filteredArr);
        }
        return pic.flagIcons = !pic.flagIcons;
      }
    })
    setImages(_images);
  }
  useEffect(()=>{
    const _userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserInfo(_userInfo);
    if(userInfo.name === "ayah"){
      setErrorMsg("");
    }
    return ()=>{
      let state = lovedImg.length ? true: false;
      let obj = {state , data:lovedImg};
      localStorage.setItem("lovedImgs", JSON.stringify(obj));
    }
  }, [lovedImg]);

  return (
      <div className={flag ? "pt-5 homePage" : "pt-5 homePage1"}>
        <div className="pt-5 container ">
          <form className="searchForm" onSubmit={getImages}>
            <input type="text" value={query} onChange={searchData} placeholder="Search for Images"/>
            <button type="submit">Search</button>
          </form>
          <div>
            <p>{errorMsg}</p>
          </div>
          <div className="images row m-auto mt-3">
            {flag ?
            images.map((pic, idx) => {
              return (
                <div className="col-md-3 imageCard" key={idx}>
                  <div>
                    <img
                      src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                      alt={pic.title}
                    />
                  </div>
                  <button className="loveBtn" onClick={()=>loved(pic.id)}>
                    {pic.flagIcons ? <i className="fa-solid fa-heart"></i>
                    :<i className="fa-regular fa-heart"></i>
                    }
                  </button>
                </div>
              );
            }): 
            <p className="textMsg">{noImgsMsg}</p>}
          </div>
          
        </div>
      </div>
  );
}

export default Home;
