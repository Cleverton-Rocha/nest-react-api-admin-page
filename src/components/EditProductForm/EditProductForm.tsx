import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Product } from '../../pages/Products/Products';
import { useParams } from 'react-router-dom';

interface initialProductState {
  id: string | undefined
  name: string | undefined
  description: string | undefined
  price: string | undefined
  image: string | undefined
  texture: string | undefined
  weight: string | undefined
  size: string | undefined
}


function EditProductForm() {

  const [originalProduct, setOriginalProduct] = useState<Product>();
  const { id } = useParams();
  const productID = id;

  const getProduct = () => {
    const apiURLGet = 'https://ecommerce-api-nest.vercel.app/products/one/';


    fetch(apiURLGet + productID, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((product) => {
        setOriginalProduct(product);
      });

  };

  const initialProductState: initialProductState = {
    id: originalProduct?.id,
    name: originalProduct?.name,
    description: originalProduct?.description,
    price: originalProduct?.price,
    image: originalProduct?.image,
    texture: originalProduct?.texture,
    weight: originalProduct?.weight,
    size: originalProduct?.size,
  };


  const [product, setProduct] = useState<initialProductState>(initialProductState);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof initialProductState) => {
    setProduct({ ...product, [field]: e.target.value });
  };


  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const apiURLEdit = 'https://ecommerce-api-nest.vercel.app/products/update/';

    if (!originalProduct) {
      console.error('Original product not available');
      return;
    }

    try {
      const response = await fetch(apiURLEdit + productID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: product.name, description: product.description, price: product.price, image: product.image, texture: product.texture, weight: product.weight, size: product.size }),
      });

      if (!response.ok) {
        const data = await response.json();
        window.alert(data.message);
      } else {
        const data = await response.json();

        if (data.error) {
          return window.alert(data.error);
        }

        window.alert('Product updated successfully.');
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <form className='w-52 md:w-72' onSubmit={handleEdit}>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="ID">ID</label>
          <input className='cursor-not-allowed select-none p-2 text-sm border outline-blue-400' type="text" placeholder='Product ID' value={productID} onChange={(e) => handleInputChange(e, 'id')} required disabled />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Name">Name</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product name' value={product.name} onChange={(e) => handleInputChange(e, 'name')} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Description">Description</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product description' value={product.description} onChange={(e) => handleInputChange(e, 'description')} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Price</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product price' value={product.price} onChange={(e) => handleInputChange(e, 'price')} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Image</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product image' value={product.image} onChange={(e) => handleInputChange(e, 'image')} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Texture</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product texture' value={product.texture} onChange={(e) => handleInputChange(e, 'texture')} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Size</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product size' value={product.size} onChange={(e) => handleInputChange(e, 'size')} />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Weight</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product weight' value={product.weight} onChange={(e) => handleInputChange(e, 'weight')} />
        </div>


        <div className="flex justify-center mt-3 text-white font-semibold gap-14">
          <button type='submit' className='w-full p-1 rounded-sm bg-green-600 hover:bg-green-700 transition duration-150'>Edit</button>
        </div>

      </form>
    </div>
  );
}

export default EditProductForm;