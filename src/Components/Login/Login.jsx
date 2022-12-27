import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  // const [user, setUserData] = useState({name:'', token:''})
  const [userName, setUserName] =  useState("");
  const [password, setPassword] =  useState("");
  const [isWaiting, setIsWaiting] =  useState(false);
  const navigate = useNavigate();

  function onFormSubmit(e){
    e.preventDefault();
    setIsWaiting(true);

/// true
    setIsWaiting(false);
    navigate('/');
//// false
    alert('username or password is wrong !');
    setIsWaiting(false);
  }


  return (
    <div className='container mt-4 pt-5'>
        <form action=""className='pt-5' onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="userName" className='form-label' >Username</label>
                <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} id="username" className='form-control'/>
            </div>
            <div>
                <label htmlFor="password" className='form-label' >password</label>
                <input type="password" value={password} id="password" onChange={(e)=>{setPassword(e.target.value)}} className='form-control' />
            </div>
            <button className='mt-3 btn btn-primary' disabled={isWaiting} type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login;