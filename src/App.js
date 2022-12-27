import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Loved from './Components/Loved/Loved';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import Navbar from './Components/Navbar/Navbar';





function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='loved' element={<Loved />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Notfound />} />

      </Routes>
    </div>
  );
}

export default App;
