import React, { useState } from 'react';
import { apiKey, ImageSearch } from '../../Utils/ApiUtils';
// import './Home.scss';


function Home() {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);

    function searchData(e){
        setQuery(e.target.value);
    }

    async function getImages(e){
        e.preventDefault();
        let data = await ImageSearch(query, 28, apiKey);
        if(data.stat === "ok"){
            console.log(data.photos.photo);
            setImages(data.photos.photo);
        } else {
            console.log('No Results');
        }
    }

  return (
    <div>
        <form onSubmit={getImages}>
            <input type="text" onChange ={searchData} />
            <button type='submit' >images</button>
        </form>
        <div className='row'>
        {images.map((pic,idx)=>{
            return (
                <div className='col-md-3 imageCard' key={idx}>
                    <div >
                        <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`} alt={pic.title} />
                    </div>
                </div>
            )
        })}
        </div>
        
    </div>
  )
}

export default Home