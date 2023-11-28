import { ChangeEvent, FormEvent, useState } from 'react';
import Cookies from 'js-cookie';

function CreateUserForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const apiURL = 'https://ecommerce-api-nest.vercel.app/user/create';

    try {

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password })
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

        window.alert('User created successfully.');
      }

    } catch (error) {
      console.error('Something went wrong', error);
    }

  };


  return (


    <div className="flex justify-center mt-24">
      <form className='w-72' onSubmit={handleCreate}>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold' htmlFor="Name">Name</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Your name' value={name} onChange={handleNameChange} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold' htmlFor="Email">Email</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Ex:email@email.com' value={email} onChange={handleEmailChange} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold' htmlFor="Password">Password</label>
          <input className='p-2 text-sm border outline-blue-400' type="password" placeholder='Your password' value={password} onChange={handlePasswordChange} />
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
          <button type='submit' className='w-full p-1 rounded-sm bg-blue-500 hover:bg-blue-600 transition duration-150'>Create</button>
        </div>

      </form>
    </div>
  );
}

export default CreateUserForm;