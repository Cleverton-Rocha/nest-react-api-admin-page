import { ChangeEvent, FormEvent, useState } from 'react';
import Cookies from 'js-cookie';

function CreateProductForm() {

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState<string>('');
  const [texture, setTexture] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [size, setSize] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleTextureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTexture(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    const apiURL = 'https://ecommerce-api-nest.vercel.app/products/create';

    try {

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, price, image, texture, weight, size })
      });

      if (!response.ok) {
        const data = await response.json();
        window.alert(data.message);
      }

      if (response.ok) {
        const data = await response.json();

        if (data.error) {
          return window.alert(data.error);
        }

        window.alert('Product created successfully.');
      }

    } catch (error) {
      console.error('Something went wrong', error);
    }

  };


  return (
    <div className="flex justify-center mt-24">
      <form className='w-52 md:w-72' onSubmit={handleCreate}>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Name">Name</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product name' value={name} onChange={handleNameChange} required />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Description">Description</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product description' value={description} onChange={handleDescriptionChange} required />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Price</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product price' value={price} onChange={handlePriceChange} required />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Image</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product image' value={image} onChange={handleImageChange} required />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Texture</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product texture' value={texture} onChange={handleTextureChange} required />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Size</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product size' value={size} onChange={handleSizeChange} required />
        </div>

        <div className="flex flex-col mt-4">
          <label className='text-sm font-semibold px-1' htmlFor="Price">Weight</label>
          <input className='p-2 text-sm border outline-blue-400' type="text" placeholder='Product weight' value={weight} onChange={handleWeightChange} required />
        </div>


        <div className="flex justify-center mt-3 text-white font-semibold gap-14">
          <button type='submit' className='w-full p-1 rounded-sm bg-blue-500 hover:bg-blue-600 transition duration-150'>Create</button>
        </div>

      </form>
    </div>
  );
}

export default CreateProductForm;