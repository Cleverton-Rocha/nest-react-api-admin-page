import { useEffect, useState } from 'react';
import GoHome from '../../components/GoHome/GoHome';
import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { RequireAuth } from '../../RequireAuth';
import CreateProductForm from '../../components/CreateProductForm/CreateProductForm';
import ProductTable from '../../components/ProductTable/ProductTable';


export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  texture: string;
  weight: string;
  size: string;
}


function Products() {

  const [creating, setCreating] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const showCreateForm = () => {
    setCreating(true);
  };

  const hideCreateForm = () => {
    setCreating(false);
  };

  const fetchProducts = () => {

    const apiURL = 'https://ecommerce-api-nest.vercel.app/products/all';

    fetch(apiURL, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((products) => {
        setLoading(false);
        setProduct(products);
      });

  };

  useEffect(() => {
    fetchProducts();
  }, [creating]);

  RequireAuth();

  return (
    <>
      <Header />
      <div className='flex flex-col w-full h-screen mt-10 rounded-sm'>
        <GoHome />

        <div className='flex w-full justify-around bg-white-500 p-4'>
          <div className='text-sm md:text-2xl font-medium bg-white-500'>
            <h1 className='bg-white-500'>Manage Products</h1>
          </div>

          <div className='flex text-xs md:text-lg gap-4 md:gap-8 bg-white-500'>
            <button onClick={showCreateForm} className='p-1 w-24 md:w-44 bg-blue-500 hover:bg-blue-600 transition duration-150 text-white font-medium rounded-sm text-center'>Create Product</button>
          </div>
        </div>

        {creating ? (
          <>
            <CreateProductForm />
            <button onClick={hideCreateForm} className='flex justify-center mx-auto w-52 md:w-72 p-1 mt-2 font-semibold text-white rounded-sm bg-red-500 hover:bg-red-600 transition duration-150'>Close</button>
          </>
        ) :

          loading ? (
            <div className='flex justify-center items-center h-96'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <table className="mx-auto text-center w-3/6 bg-white border border-gray-300 mt-20">
                <thead className="bg-gray-200">
                  <tr className='border-b-2 text-xs md:text-lg'>
                    <th className="py-2 px-4">ID</th>
                    <th className="py-2 px-4">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((product, index) => (
                    <ProductTable
                      key={index}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      texture={product.texture}
                      weight={product.weight}
                      size={product.size}
                      afterChange={fetchProducts}
                    />
                  ))}

                </tbody>
              </table>
            </>
          )}
      </div>
    </>
  );
}

export default Products;