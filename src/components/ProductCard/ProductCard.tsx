import { Product } from '../../pages/Products/Products';

interface ProductCardProps extends Partial<Product> {
  imageSize: string
}

function ProductCard(props: ProductCardProps) {
  return (
    <>
      <div className='mb-5'>
        <img width={props.imageSize} src={props.image} alt="Product" />
      </div>

      <div className='flex flex-col items-center text-xl'>

        <div className='font-medium'>
          <span className='text-blue-700'>ID: </span>
          {props.id}
        </div>

        <div className='font-medium'>
          <span className='text-blue-700'>Name: </span>
          {props.name}
        </div>

        <div className='font-medium'>
          <span className='text-blue-700'>Price: </span>
          {props.price}
        </div>

        <div className='font-medium'>
          <span className='text-blue-700'>Texture: </span>
          {props.texture}
        </div>

        <div className='font-medium'>
          <span className='text-blue-700'>Weight: </span>
          {props.weight}
        </div>

        <div className='font-medium'>
          <span className='text-blue-700'>Size: </span>
          {props.size}
        </div>

      </div>
    </>
  );
}

export default ProductCard;