import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Home() {
  return (
    <>
      <Header/>
      <div className='flex justify-center mt-44 gap-10'>

        <div className='flex flex-col items-center rounded-sm w-1/6 h-1/5 p-5 border-2'>
          <h1 className='text-4xl mt-5 font-semibold border-b'>Products</h1>
          <span className='mt-5 text-sm font-medium'>Manage the products.</span>
          <Link to='/products' className='mt-5 w-44 bg-blue-500 hover:bg-blue-600 transition duration-150 text-white font-medium rounded-sm text-center'>Go</Link>
        </div>

        <div className='flex flex-col items-center rounded-sm w-1/6 h-1/5 p-5 border-2'>
          <h1 className='text-4xl mt-5 font-semibold border-b'>Users</h1>
          <span className='mt-5 text-sm font-medium'>Manage the users.</span>
          <Link to='/users' className='mt-5 w-44 bg-blue-500 hover:bg-blue-600 transition duration-150 text-white font-medium rounded-sm text-center'>Go</Link>
        </div>

        

      </div>
    </>
  );
}

export default Home;