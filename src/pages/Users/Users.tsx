import { useEffect, useState } from 'react';
import { RequireAuth } from '../../RequireAuth';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';
import UserTable from '../../components/UserTable/UserTable';
import GoHome from '../../components/GoHome/GoHome';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import CreateUserForm from '../../components/CreateUserForm/CreateUserForm';

export interface User {
  id: string;
  email: string;
  name: string;
}

function Users() {
  const [creating, setCreating] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const showCreateForm = () => {
    setCreating(true);
  };
  const hideCreateForm = () => {
    setCreating(false);
  };


  const fetchUsers = () => {
    const token = Cookies.get('token');
    const apiURL = 'https://ecommerce-api-nest.vercel.app/user/all';

    fetch(apiURL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((users) => {
        setLoading(false);
        setUser(users);
      });
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [creating]);

  RequireAuth();

  return (
    <>
      <Header />
      <div className='flex flex-col w-full h-screen mt-10 rounded-sm'>
        <GoHome />

        <div className='flex w-full justify-around bg-white-500 p-4'>
          <div className='text-2xl font-medium'>
            <h1 className='bg-white-500'>Manage Users</h1>
          </div>

          <div className='flex gap-8 bg-white-500'>
            <button onClick={showCreateForm} className='p-1 w-44 bg-blue-500 hover:bg-blue-600 transition duration-150 text-white font-medium rounded-sm text-center'>Create User</button>
          </div>
        </div>

        {creating ? (
          <>
            <CreateUserForm />
            <button onClick={hideCreateForm} className='flex justify-center mx-auto w-72 p-1 mt-4 font-semibold text-white rounded-sm bg-red-500 hover:bg-red-600 transition duration-150'>Close</button>
          </>
        ) :
          loading ? (
            <div className='flex justify-center items-center h-96'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <table className="mx-auto w-3/6 bg-white border border-gray-300 mt-20">
                <thead className="bg-gray-200">
                  <tr className='border-b-2'>
                    <th className="py-2 px-4 text-center">ID</th>
                    <th className="py-2 px-4 text-center">Name</th>
                    <th className="py-2 px-4 text-center">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((user, index) => (
                    <UserTable
                      key={index}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                    />
                  ))}
                </tbody>
              </table>
              <button onClick={refreshUsers} className='flex justify-center mx-auto w-48 p-1 mt-4 font-semibold text-white rounded-sm bg-green-600 hover:bg-green-700 transition duration-150'>Refresh</button>
            </>
          )}
      </div>
    </>
  );
}

export default Users;
