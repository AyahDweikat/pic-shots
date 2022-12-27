import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/Context';

function Loved() {
  return (
    <div className='pt-5'>
      <p  className='pt-5'>loved</p>
      {/* <div className="images row m-auto">
            {lovedImg.map((pic, idx) => {
              return (
                <div className="col-md-3 imageCard" key={idx}>
                  <div>
                    <img
                      src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                      alt={pic.title}
                    />
                  </div>
                  <button onClick={()=>loved(pic)}>L</button>
                </div>
              );
            })}
          </div> */}
    </div>
  )
}

export default Loved