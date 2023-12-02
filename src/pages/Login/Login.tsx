import { useState, ChangeEvent, FormEvent } from 'react';
import { MdWavingHand } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const apiURL = 'https://ecommerce-api-nest.vercel.app/login';

    try {

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.access_token, { secure: true, sameSite: 'strict', expires: 1 });
        setLoggedIn(true);
      }

      if (!response.ok) {
        const data = await response.json();
        window.alert(data.message);
      }

    } catch (error) {
      console.error('Something went wrong', error);
    } finally {
      setLoading(false);
    }

  };

  const navigate = useNavigate();

  if(loggedIn){
    navigate('/home');
  }

  return (
    <div className="flex flex-col w-full items-center mt-36">

      <div className='w-3/5 sm:w-2/5 md:w-1/5'>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl">Login</h1>
          <div className='flex items-center gap-1'>
            <span className="text-xs md:text-sm font-semibold">Hi, Welcome</span>
            <MdWavingHand />
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="flex flex-col mt-4">
            <label className='text-xs md:text-sm font-semibold' htmlFor="Email">Email</label>
            <input className='p-2 text-xs md:text-sm border outline-blue-400' type="text" placeholder='Ex: email@email.com' value={email} onChange={handleEmailChange} />
          </div>

          <div className="flex flex-col mt-4">
            <label className='text-xs md:text-sm font-semibold' htmlFor="Password">Password</label>
            <input className='p-2 text-xs md:text-sm border outline-blue-400' type="password" placeholder='Enter your password' value={password} onChange={handlePasswordChange} />
            <span></span>
          </div>

          <div className="flex justify-center mt-6 text-sm md:text-lg text-white font-semibold">
            <button type='submit' className='w-full p-2 rounded-sm bg-blue-500 hover:bg-blue-600 transition duration-150'>{loading ? 'Loading...' : 'Login'}</button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;