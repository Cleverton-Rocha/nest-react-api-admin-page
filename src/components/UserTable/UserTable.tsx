import { User } from '../../pages/Users/Users';
import { MdDelete, MdCheckCircle, MdCancel, MdCreate } from 'react-icons/md';
import Cookies from 'js-cookie';
import { ChangeEvent, FormEvent, useState } from 'react';

interface UserTableProps extends User {
  afterChange: () => void;
}

function UserTable(props: UserTableProps) {

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const [editingName, setEditingName] = useState<boolean>(false);
  const [editingEmail, setEditingEmail] = useState<boolean>(false);

  const [name, setName] = useState<string>(props.name);
  const [email, setEmail] = useState<string>(props.email);

  // Delete user
  const handleDelete = async () => {

    const token = Cookies.get('token');
    const apiURL = `https://ecommerce-api-nest.vercel.app/user/delete/${props.id}`;


    try {

      const response = await fetch(apiURL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const data = await response.json();
        window.alert(data.message);
      }

      setConfirmDelete(false);
      props.afterChange();


    } catch (error) {
      console.error('Something went wrong', error);
    }

  };

  const handleConfirmClickDelete = () => {
    setConfirmDelete(true);
  };

  const handleCancelClickDelete = () => {
    setConfirmDelete(false);
  };

  // Edit name
  const handleEditName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const apiURL = `https://ecommerce-api-nest.vercel.app/user/update/${props.id}`;


    try {

      const response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name })
      });

      if (!response.ok) {
        const data = await response.json();
        window.alert(data.message);
      }

      setEditingName(false);
      props.afterChange();

    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const handleCancelClickEditName = () => {
    setName(props.name);
    setEditingName(false);
  };

  const handleEditClickName = () => {
    setEditingName(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Edit email
  const handleEditEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const apiURL = `https://ecommerce-api-nest.vercel.app/user/update/${props.id}`;

    try {

      const response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        const data = await response.json();
        if ('error' in data) {
          window.alert(data.error);
        }
      }

      if (!response.ok) {
        const data = await response.json();
        window.alert(data.message);
      }

      setEditingEmail(false);
      props.afterChange();

    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const handleCancelClickEditEmail = () => {
    setEmail(props.email);
    setEditingEmail(false);
  };

  const handleEditClickEmail = () => {
    setEditingEmail(true);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <tr className='text-xs md:text-lg'>
      <td className=''>{props.id}</td>

      <td className='flex flex-col items-center py-4 px-7 md:py-2 md:px-0 md:block'>
        {editingName ? (
          <>
            <form onSubmit={handleEditName}>
              <input type='text' value={name} onChange={handleNameChange} className='border border-gray-300 w-24 px-2 md:py-1  outline-none' />
              <button type='submit' className='text-blue-500 hover:text-blue-600 transition duration-150'><MdCheckCircle className='-mb-1 mx-1 w-4 h-4 md:w-5 md:h-5' /></button>
              <button onClick={handleCancelClickEditName} className='text-blue-500 hover:text-blue-600 transition duration-150'><MdCancel className='-mb-1 w-4 h-4 md:w-5 md:h-5' /></button>
            </form>
          </>
        )
          : (
            <>{props.name}{' '}
              <button onClick={handleEditClickName} className='text-blue-500 hover:text-blue-600 transition duration-150'>
                <MdCreate className='-mb-0.5 w-4 h-4 md:w-5 md:h-5' />
              </button>
            </>
          )}
      </td>

      <td className='py-2'>
        {editingEmail ? (
          <>
            <form onSubmit={handleEditEmail}>
              <input type='text' value={email} onChange={handleEmailChange} className='border border-gray-300 w-32 md:w-48 px-2 md:py-1 outline-none' />
              <button type='submit' className='text-blue-500 hover:text-blue-600 transition duration-150'><MdCheckCircle className='-mb-1 mx-1 w-4 h-4 md:w-5 md:h-5' /></button>
              <button onClick={handleCancelClickEditEmail} className='text-blue-500 hover:text-blue-600 transition duration-150'><MdCancel className='-mb-1 w-4 h-4 md:w-5 md:h-5' /></button>
            </form>
          </>
        )
          : (
            <> {props.email}{' '}
              <button onClick={handleEditClickEmail} className='text-blue-500 hover:text-blue-600 transition duration-150'>
                <MdCreate className='-mb-0.5 w-4 h-4 md:w-5 md:h-5' />
              </button>
            </>
          )}
      </td>

      <td className='font-bold'>
        <div className='mb-3 md:mb-0'>
          <span>****</span>
        </div>
      </td>

      <td>
        {confirmDelete ?
          <>
            <div className='flex items-center mb-5 md:mb-0 md:block'>
              <button onClick={handleDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdCheckCircle className='w-4 h-4 md:w-5 md:h-5' /></button>
              <button onClick={handleCancelClickDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdCancel className='w-4 h-4 md:w-5 md:h-5' /></button>
            </div>
          </>
          :
          <div className='mb-3.5 md:mb-0'>
            <button onClick={handleConfirmClickDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdDelete className='w-4 h-4 md:w-5 md:h-5'  /></button>
          </div>
        }
      </td>
    </tr>
  );
}

export default UserTable;