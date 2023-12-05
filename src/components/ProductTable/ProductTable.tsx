import { Link } from 'react-router-dom';
import { Product } from '../../pages/Products/Products';
import { MdCancel, MdCheckCircle, MdDelete, MdOpenInNew } from 'react-icons/md';
import { useState } from 'react';
import Cookies from 'js-cookie';


interface ProductTableProps extends Product {
  afterChange: () => void;
}

function ProductTable(props: ProductTableProps) {

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = async () => {

    const token = Cookies.get('token');
    const apiURL = `https://ecommerce-api-nest.vercel.app/products/delete/${props.id}`;


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

  return (
    <tr className='text-sm md:text-lg'>

      <td className=''>{props.id}</td>

      <td className='flex flex-col items-center py-4 px-7 md:py-2 md:px-0 md:block'>
        {props.name}
      </td>

      <td className='w-8 h-5'>
        <Link className='text-blue-600 hover:text-blue-700 transition duration-150' to={`/product/${props.id}`}><MdOpenInNew className='w-10 h-4 mb-1 md:mb-0 md:w-5 md:h-5' /></Link>
      </td>

      <td className='w-20 h-5'>
        {confirmDelete
          ?
          <>
            <div className='flex items-center justify-center mb-1 md:mb-0'>
              <button onClick={handleDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdCheckCircle className='w-4 h-4 md:w-5 md:h-5' /></button>
              <button onClick={handleCancelClickDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdCancel className='w-4 h-4 md:w-5 md:h-5' /></button>
            </div>
          </>
          :
          <button onClick={handleConfirmClickDelete} className='text-red-500 hover:text-red-600 transition duration-150'><MdDelete className='w-4 h-4 md:w-5 md:h-5 md:mt-2' /></button>
        }
      </td>

    </tr>
  );
}

export default ProductTable;