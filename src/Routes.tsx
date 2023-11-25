import { Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login';



function MainRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='/' element={<Login/>}/>

      </Route>
    </Routes>
  );
}

export default MainRoutes;