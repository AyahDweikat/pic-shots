import axios from "axios";

export const apiKey = '32d46fe5e3f0a3c693e291271ef51e11';

export async function ImageSearch(query, num, apiKey){
    let resp = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${num}&format=json&nojsoncallback=1`);
    if(resp.status === 200){
      return resp.data;
    } else{
        console.log("NoResults in Api");
    }

}