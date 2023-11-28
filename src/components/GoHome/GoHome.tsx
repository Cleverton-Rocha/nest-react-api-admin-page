import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

function GoHome() {
  return (
    <div className='flex w-28 px-1 rounded-sm hover:text-blue-700 transition duration-150'>
      <MdChevronLeft size={25}/>
      <Link to={'/home'} className='font-medium' >Go home</Link>
    </div>
  );
}

export default GoHome;