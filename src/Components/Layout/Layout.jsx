import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { FakeLoginApi } from '../../Utils/LoginUtils';
import Navbar from '../Navbar/Navbar';
import { GlobalContext } from './../../Context/Context';

function Layout() {
  const [user, setUser] =  useState('');
    const [token, setToken] =  useState('');
    const auth ={
      user, 
      token, 
      signin: async (username, password) => {
        const resp = await FakeLoginApi(username, password);
        if (resp.status === 200) {
            setUser(resp.user);
            setToken(resp.token);
          }
          return resp;
        },
        signout:()=>{
          setUser('');
          setToken('');
        }
      }
  return (
    <div>
      <GlobalContext.Provider value ={{auth}}>
        <Navbar/>
        <Outlet />
      </GlobalContext.Provider>
    </div>
  )
}

export default Layout