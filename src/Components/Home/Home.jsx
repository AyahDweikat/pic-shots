import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/Context";
import { apiKey, ImageSearch } from "../../Utils/ApiUtils";
import "./Home.scss";

function Home({getLovedImagesInApp}) {
  const [query, setQuery] = useState("mountains");
  const [message, setMsg] = useState("");

  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [lovedImg, setLovedImg] = useState([]);
  function searchData(e) {
    setQuery(e.target.value);
  }

  async function getImages(e) {
    e.preventDefault();
    setQuery("");
    setImages([]);
    // setFlag(true);

    let data = await ImageSearch(query, 100, apiKey);
    console.log(data.photos.pages);
    if (data.stat === "ok" && data.photos.pages) {
      data.photos.photo.map((item)=>{
        item.flagIcons = false;
      })
      setFlag(true);

      setImages(data.photos.photo);
    } else {
      setFlag(false);
      setMsg("No Results coming from this search");
    }
  }
  function loved(id){
    let _images = [...images];
    let _lovedImg = [...lovedImg];
    _images.map((pic)=>{
      if(pic.id === id){
        if(pic.flagIcons=== false){
          _lovedImg.push(pic);
          setLovedImg(_lovedImg);
        } else {
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
    return ()=>{
      let state =   lovedImg.length ? true: false;
      let Obj = {state , data:lovedImg }
      getLovedImagesInApp(Obj);
    }
  }, [lovedImg]);

  return (
      <div className={flag ? "pt-5 homePage" : "pt-5 homePage1"}>
        <div className="pt-5 container ">
          <form className="searchForm" onSubmit={getImages}>
            <input type="text" value={query} onChange={searchData} placeholder="Search for Images"/>
            <button type="submit">Search</button>
          </form>
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
            <p className="textMsg">{message}</p>}
          </div>
        </div>
      </div>
  );
}

export default Home;
