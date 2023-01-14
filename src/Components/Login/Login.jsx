import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalContext } from '../../Context/Context';
import './Login.scss'
function Login() {
  const [user, setUserData] = useState({name:'', token:''})
  const [userName, setUserName] =  useState("");
  const [password, setPassword] =  useState("");
  const [isWaiting, setIsWaiting] =  useState(false);
  const navigate = useNavigate();
  const {auth} = useContext(GlobalContext);
  const _location = useLocation();

  function showAlertErrorLogin(){
    Swal.fire({
      icon: 'error',
      title: 'OOps',
      text: 'username or password is wrong',
    })
  }

  async function onFormSubmit(e){
    e.preventDefault();
    setIsWaiting(true);
    const resp = await auth.signin(userName, password);
    if(resp.status === 200){
      setIsWaiting(false);
      let obj={userName:"", password:"123"}
      obj.userName= resp.userName;
      setUserData(obj);
      localStorage.setItem("userinfo", JSON.stringify(obj))
      navigate('/');
    } else{
      setIsWaiting(false);
      showAlertErrorLogin()
    }
  }


  return (
    <div className="login pt-5">
      <div className='container loginCard'>
        <form action="" className='formCard' onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="userName" className='form-label' >Username</label>
                <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} id="username" className='form-control'/>
            </div>
            <div>
                <label htmlFor="password" className='form-label' >Password</label>
                <input type="password" value={password} id="password" onChange={(e)=>{setPassword(e.target.value)}} className='form-control' />
            </div>
            <button className='mt-3 btn btnSubmit' disabled={isWaiting} type='submit'>Login</button>
        </form>
    </div>
    </div>
    
  )
}

export default Login;