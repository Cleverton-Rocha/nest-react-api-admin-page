import { Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';



function MainRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>

      </Route>
    </Routes>
  );
}

export default MainRoutes;