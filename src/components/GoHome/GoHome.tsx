import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

function GoHome() {
  return (
    <div className='flex items-center text-xs md:text-lg w-32 px-1 rounded-sm hover:text-blue-700 transition duration-150'>
      <MdChevronLeft className='w-4 h-4 md:w-6 md:h-7'/>
      <Link to={'/home'} className='font-medium' >Home</Link>
    </div>
  );
}

export default GoHome;