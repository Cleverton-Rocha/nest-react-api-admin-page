import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface BackPageProps {
  link: string
  pageName: string
}

function BackPage(props: BackPageProps) {
  return (

    <div className='flex items-center text-xs md:text-lg w-32 px-1 rounded-sm hover:text-blue-700 transition duration-150'>
      <MdChevronLeft className='w-4 h-4 md:w-6 md:h-7' />
      <Link to={props.link} className='font-medium' >{props.pageName}</Link>
    </div>

  );
}

export default BackPage;