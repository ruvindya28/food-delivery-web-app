import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';

const ProductCategory = () => {
   const { products} = useAppContext()
   const { category: urlCategory } = useParams(); // Rename to avoid confusion
   
   // Convert the URL category to lowercase for consistent comparison
   const lowerCaseCategory = urlCategory.toLowerCase();

   const searchCategory = categories.find((item) => item.path.toLowerCase() === lowerCaseCategory);

   const filteredProducts = products.filter((product) => product.category.toLowerCase() === lowerCaseCategory);

  return (
    <div className='mt-16'>
       {
        searchCategory && (
          <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
          </div>
        )
       }
    </div>
  )
}

export default ProductCategory
