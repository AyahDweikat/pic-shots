import React from "react";

function Loved({ lovedImgsFromHome }) {
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
