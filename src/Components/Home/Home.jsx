import React, { useEffect, useState } from "react";
import { apiKey, ImageSearch } from "../../Utils/ApiUtils";
import "./Home.scss";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [suggArr, setSugg] = useState([
    "mountains",
    "flowers",
    "snow",
    "rivers",
    "computer",
    "sites",
    "travel",
    "london",
    "paris",
    "roma",
    "newyork",
    "seoul"
  ]);
  const [lovedImg, setLovedImg] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [suggestions, setSuggestions] = useState([{}]);
  const navigate = useNavigate()



  function searchData(e) {
    setQuery(e.target.value);
  }
  async function getImages(e, item, num) {
    e.preventDefault();
    addtoSuggestion(item);
    setImages([]);
    setFlag(true);
    let { data, status } = await ImageSearch(item, num, apiKey);
    if (status === 200 && data.pages) {
      data.photo.map((item) => {
        item.flagIcons = false;
      });
      setFlag(true);
      setImages(data.photo);
      setQuery("");
      setSuggestions([]);
    } else {
      setFlag(false);
      showAlertNoResult();
    }
  }
  function showAlertNoResult (){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No results from this search!',
    });
    getSuggest();
  }
  function showAlertNotLogin(){
    Swal.fire({
      icon: 'error',
      title: 'You are not login!',
      text: 'Go to login?',
    }).then(function () {
        navigate('/Login')
      });
  }
  function addtoSuggestion(queryToSugg){
    let _suggArr = [...suggArr];
    if(!_suggArr.includes(queryToSugg)){
      _suggArr.unshift(queryToSugg);
    }
    setSugg(_suggArr);
  }
  async function getSuggest(){
    const resultArray = await Promise.all(suggArr.map(async (name) => {
      return {
        name: name,
        data: await ImageSearch(name, 1, apiKey)
      }
    }
    ));
    let _arr= await resultArray.map((item)=>{
      return {
        name: item.name,
        pic : item.data.data.photo[0]
      }
    });
    setSuggestions(_arr);
  }
  function goToSuggestions(e){
    e.preventDefault()
    getSuggest();
    setFlag(false);
  }
  useEffect(()=>{
    getSuggest();
    setFlag(false)
  },[])

  function loved(id) {
    if (!userInfo) {
      showAlertNotLogin()
      return 0;
    }
    let _images = [...images];
    let _lovedImg = [...lovedImg];
    _images.map((pic) => {
      if (pic.id === id) {
        if (pic.flagIcons === false) {
          _lovedImg.push(pic);
          setLovedImg(_lovedImg);
        } else {
          let __filteredArr = _lovedImg.filter((item) => {
            return item.id !== id;
          });
          setLovedImg(__filteredArr);
        }
        return (pic.flagIcons = !pic.flagIcons);
      }
    });
    setImages(_images);
  }
  useEffect(() => {
    const _userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserInfo(_userInfo);
    if (userInfo.name === "ayah") {
      showAlertNotLogin();
    }
    return () => {
      let state = lovedImg.length ? true : false;
      let obj = { state, data: lovedImg };
      localStorage.setItem("lovedImgs", JSON.stringify(obj));
    };
  }, [lovedImg]);

  return (
    <div className={flag ? "pt-5 homePage" : "pt-5 homePage1"}>
      <div className="pt-5 container ">
        <form className="searchForm" onSubmit={(e) => getImages(e, query, 100)}>
          <input
            type="text"
            value={query}
            onChange={searchData}
            placeholder="Search for Images"
          />
          <button type="submit">Search</button>
          <button onClick={goToSuggestions} className="mx-3 ms-auto" >Suggestions</button>
        </form>

        <div className="images row m-auto mt-3">
          {flag ? (
            images.map((pic, idx) => {
              return (
                <div className="col-md-3 imageCard" key={idx}>
                  <div>
                    <img
                      src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                      alt={pic.title}
                    />
                  </div>
                  <button className="loveBtn" onClick={() => loved(pic.id)}>
                    {pic.flagIcons ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="images row m-auto">
              <p className="title">Suggestions</p>
            {(suggestions)?
            suggestions.map((item, idx) => {
              return (
                <div className="col-md-4 imageCard suggestion" key={idx} onClick={(e) => getImages(e, item.name, 100)}>
                    <div className="member">
                      <img
                        src={`https://live.staticflickr.com/${item?.pic?.server}/${item?.pic?.id}_${item?.pic?.secret}_w.jpg`}
                        alt={item?.pic?.title}
                      />
                      <div className="titleHover">
                        <span class="nameHover">{item.name}</span>
                      </div>
                    </div>
                </div>
              );
            }):""}
          </div>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
