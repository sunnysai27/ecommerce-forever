import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import { Title } from './Title'

const RelatedProducts = ({category , subCategory}) => {
    const {products} = useContext(ShopContext);
    const [relatedProduts, setRelatedProducts] = useState([]);


    useEffect(() => {
        if(products.length > 0 ){
            let temp = products.slice();
            temp = temp.filter((item) => (
                item.category === category && item.subCategory === subCategory
            ));

            setRelatedProducts(temp.slice(5));
        }

    }, [products])


  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1="RELATED" text2="PRODUCTS" />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                relatedProduts.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }

        </div>
        
      
    </div>
  )
}

export default RelatedProducts
