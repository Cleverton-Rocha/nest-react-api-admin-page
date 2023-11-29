import { ChangeEvent, FormEvent, useState } from 'react';
import Cookies from 'js-cookie';

function EditPasswordForm() {
  const [firstPassword, setFirstPassword] = useState<string>('');
  const [secondPassword, setSecondPassword] = useState<string>('');
  const [ID, setID] = useState<string>('');

  const handleFirstPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstPassword(e.target.value);
  };

  const handleSecondPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
  };

  const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
  };


  const handleEditPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const apiURL = `https://ecommerce-api-nest.vercel.app/user/update/${ID}`;

    try {

      if (firstPassword === secondPassword) {

        const response = await fetch(apiURL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ password: firstPassword })
        });

        if (!response.ok) {
          const data = await response.json();
          window.alert(data.message);
        }

        if (response.ok) {
          const data = await response.json();

          if (data.error) {
            return window.alert(data.error);
          }

          return window.alert('Password updated successfully.');
        }
      } else {
        return window.alert('Passwords are not the same.');
      }

    } catch (error) {
      console.error('Something went wrong', error);
    }

  };


  return (


    <div className="flex justify-center mt-24">
      <form className='w-52 md:w-72' onSubmit={handleEditPassword}>

        <div className="flex flex-col mt-4">
          <label className='px-1 text-sm font-semibold' htmlFor="ID">ID</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='User ID' value={ID} onChange={handleIDChange} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='px-1 text-sm font-semibold' htmlFor="Password">Password</label>
          <input className='p-2 text-sm border outline-blue-400' type="password" placeholder='Your password' value={firstPassword} onChange={handleFirstPasswordChange} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='px-1 text-sm font-semibold' htmlFor="Password">Confirm password</label>
          <input className='p-2 text-sm border outline-blue-400' type="password" placeholder='Rewrite your password' value={secondPassword} onChange={handleSecondPasswordChange} />
          <div className='flex flex-col p-1 text-xs font-semibold text-red-500'>
            <span>Your password must contain:</span>
            <span>1 - Four or more characters.</span>
            <span>2 - An uppercase letter.</span>
            <span>3 - A lowercase letter.</span>
            <span>4 - A number.</span>
            <span>5 - A special character.</span>
          </div>
        </div>

        <div className="flex justify-center mt-3 text-white font-semibold gap-14">
          <button type='submit' className='w-full p-1 rounded-sm bg-blue-500 hover:bg-blue-600 transition duration-150'>Change password</button>
        </div>

      </form>
    </div>
  );
}

export default EditPasswordForm;