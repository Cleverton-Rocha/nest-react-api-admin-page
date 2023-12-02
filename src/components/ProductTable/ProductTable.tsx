import { Link } from 'react-router-dom';
import { Product } from '../../pages/Products/Products';
import { MdOpenInNew } from 'react-icons/md';

interface ProductTableProps extends Product {
  afterChange: () => void;
}

function ProductTable(props: ProductTableProps) {
  return (
    <tr className='text-xs md:text-lg'>
      <td className=''>{props.id}</td>

      <td className='flex flex-col items-center py-4 px-7 md:py-2 md:px-0 md:block'>
        {props.name}
      </td>

      <td>
        <Link className='text-blue-600' to={`/product/${props.id}`}><MdOpenInNew /></Link>
      </td>
    </tr>
  );
}

export default ProductTable;