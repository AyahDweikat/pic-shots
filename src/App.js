import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Loved from './Components/Loved/Loved';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/scss/bootstrap.scss';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loved' element={<Loved />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Notfound />} />

      </Routes>
    </div>
  );
}

export default App;
