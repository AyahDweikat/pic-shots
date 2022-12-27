export function FakeLoginApi(username, password){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(username==="ayah" && password == "123"){
            resolve({user: {name:"ayah"}, token:"",  status:200})
            } else {
            resolve({user: {name:""}, token:"",  status:404})

            }
        },1500)
    })
}