import { User } from '../../pages/Users/Users';
import { MdDelete, MdCheckCircle, MdCancel } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useState } from 'react';


function UserTable(props: User) {

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

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
        console.log(data);
        window.alert(data.message);
      }

      setConfirmDelete(false);

    } catch (error) {
      console.error('Something went wrong', error);
    }

  };

  const handleClickConfirm = () => {
    setConfirmDelete(true);
  };

  const handleClickCancel = () => {
    setConfirmDelete(false);
  };


  return (
    <tr>
      <td className="py-2 px-4 text-center">{props.id}</td>
      <td className="py-2 px-4 text-center">{props.name}</td>
      <td className="py-2 px-4 text-center">{props.email}</td>
      <td>
        {confirmDelete ?
          <>
            <button onClick={handleDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdCheckCircle size={22} /></button>
            <button onClick={handleClickCancel} className='text-red-500 hover:text-red-600 transition duration-150'><MdCancel size={22} /></button>
          </>
          :
          <button onClick={handleClickConfirm} className='text-red-500 hover:text-red-600 transition duration-150'><MdDelete size={22} /></button>}
      </td>
    </tr>
  );
}

export default UserTable;