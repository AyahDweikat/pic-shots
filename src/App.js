import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Loved from './Components/Loved/Loved';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';

import Layout from './Components/Layout/Layout';
import { useState } from 'react';





function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout/> }>
          <Route path='/' element={<Home />} />
          <Route path='loved' element={<Loved />} />
          <Route index path='/login' element={<Login />} />
          <Route path='*' element={<Notfound />} />

        </Route>
        

      </Routes>
    </div>
  );
}

export default App;
