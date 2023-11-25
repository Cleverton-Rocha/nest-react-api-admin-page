import { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

function Header() {

  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
  };

  if(!loggedIn){
    navigate('/');
  }

  return (
    <div className="flex justify-around w-full h-28 shadow-lg">

      <Link to='/home' className='flex items-center font-medium text-3xl'>Ecommerce API</Link>
      
      <ul className='flex items-center font-medium text-xl gap-10'>
        <li><Link to='/products' className='border-b-2 hover:border-b-blue-500 transition duration-150'>Products</Link></li>
        <li><Link to='/users' className='border-b-2 hover:border-b-blue-500 transition duration-150'>Users</Link></li>
        <Link onClick={handleLogout} to='/' className='hover:text-blue-800 transition duration-150 mt-1'><MdLogout size={22} /></Link>
      </ul>
      
    </div>
  );
}

export default Header;