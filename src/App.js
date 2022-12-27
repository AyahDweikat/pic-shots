import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Loved from './Components/Loved/Loved';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';

import Layout from './Components/Layout/Layout';
import { useState } from 'react';





function App() {
  const [lovedImgsFromHome, setLovedImgsFromHome] =  useState({state:'', data: ""});


  function getLovedImagesInApp(results){
    let Obj={state:false, data: ""};
    Obj.data = results.data;
    Obj.state = results.state;
    setLovedImgsFromHome(Obj);
  }
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout/> }>
          <Route path='/' element={<Home getLovedImagesInApp={getLovedImagesInApp} />} />
          <Route path='loved' element={<Loved lovedImgsFromHome={lovedImgsFromHome} />} />
          <Route index path='/login' element={<Login />} />
        </Route>
        
        <Route path='*' element={<Notfound />} />

      </Routes>
    </div>
  );
}

export default App;
