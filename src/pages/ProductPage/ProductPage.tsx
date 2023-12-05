import { useParams } from 'react-router-dom';
import { Product } from '../Products/Products';
import { useEffect, useState } from 'react';
import BackPage from '../../components/BackPage/BackPage';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import EditProductForm from '../../components/EditProductForm/EditProductForm';

function ProductPage() {

  // useState
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [editing, setEditing] = useState<boolean>(false);


  // Edit Product
  const showCreateForm = () => {
    setEditing(true);
  };
  const hideCreateForm = () => {
    setEditing(false);
  };

  // Fetch product
  const { id } = useParams();

  const fetchOneProduct = () => {

    const apiURL = 'https://ecommerce-api-nest.vercel.app/products/one/';

    fetch(apiURL + id, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((product) => {
        setLoading(false);
        setProduct(product);
      });
  };


  // UseEffect hook
  useEffect(() => {
    fetchOneProduct();
  });

  return (
    <>
      <Header />

      <div className='flex mt-10'>
        <BackPage
          link='/products'
          pageName='Products'
        />
      </div>

      <div className='flex w-full justify-around bg-white-500 p-4'>
        <div className='text-sm md:text-2xl font-medium bg-white-500'>
          <h1 className='bg-white-500'>Manage Products</h1>
        </div>

        <div className='flex text-xs md:text-lg gap-4 md:gap-8 bg-white-500'>
          <button onClick={showCreateForm} className='p-1 w-24 md:w-44 bg-green-600 hover:bg-green-700 transition duration-150 text-white font-medium rounded-sm text-center'>Edit Product</button>
        </div>
      </div>

      {loading
        ?
        (
          <LoadingSpinner />
        )
        :
        editing
          ?
          (
            <>
              <EditProductForm />
              <button onClick={hideCreateForm} className='flex justify-center mx-auto w-52 md:w-72 p-1 mt-2 mb-10 font-semibold text-white rounded-sm bg-red-500 hover:bg-red-600 transition duration-150'>Close</button>
            </>
          )
          :
          (
            <div className='flex flex-col items-center justify-center mt-10'>
              <ProductCard
                id={product?.id}
                image={product?.image}
                imageSize='150'
                name={product?.name}
                price={product?.price}
                texture={product?.texture}
                weight={product?.weight}
                size={product?.size}
                description={product?.description}

              />
            </div>
          )
      }
    </>
  );
}

export default ProductPage;