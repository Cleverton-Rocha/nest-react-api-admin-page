import { Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import Products from './pages/Products/Products';
import ProductPage from './pages/ProductPage/ProductPage';



function MainRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path='users' element={<Users />} />
        <Route path='products' element={<Products />} />
        <Route path='product/:id' element={<ProductPage />} />

      </Route>
    </Routes>
  );
}

export default MainRoutes;