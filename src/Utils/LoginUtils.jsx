export function FakeLoginApi(username, password){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(username==="ayah" && password == "123"){
            resolve({userName:"ayah", token:"",  status:200})
            } else {
            resolve({userName:"", token:"",  status:404})
            }
        },1500)
    })
}