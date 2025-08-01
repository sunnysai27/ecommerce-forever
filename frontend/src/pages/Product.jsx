import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

  const {productId} = useParams();
  const {products, currency , addToCart} = useContext(ShopContext);
  const [productData , setProductData] = useState(false);
  const [image , setImage] = useState('');
  const [seletedSize, setSelectedSize] = useState('');

  const fetchProductData = async () =>{

    products.map((item) => {
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })

  }


  useEffect(() => {
      fetchProductData();
  }, [productId, products])

  return productData ?  (
  <div className="border-t-2 pt-10 trasition-opacity ease-in duration-500 opacity-100">
    {/* Product Data */}
    <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="alt"  />
              ))
            }


          </div> 
          
          <div className="w-full sm:w-[80%] ">
              <img src={image} alt="image" className="w-full h-auto" />
          </div>
        </div>
        {/* ---------- Product Infomation ------------ */}
        <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="rating" /> 
              <img src={assets.star_icon} alt="rating" /> 
              <img src={assets.star_icon} alt="rating" /> 
              <img src={assets.star_icon} alt="rating" /> 
              <img src={assets.star_dull_icon} alt="rating" />
              <p className="pl-2">(143)</p> 
            </div>
            <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
            <p className="mt-5 text-gray-500 md:w-3/4">{productData.description}</p>
            <div className="flex flex-col gap-4 my-8 ">
              <p>Select Sizes</p>
              <div className="flex gap-2">
                {
                  productData.sizes.map((size,index) => (
                    <button onClick={() => setSelectedSize(size)} className={`border py-2 px-4 bg-gray-100 ${size === seletedSize ? 'border-orange-500' : ''}`} key={index}>{size}</button>
                  ))
                }
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, seletedSize )} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
            <hr className="mt-5 sm:w-3/4" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange within 7 days.</p>
            </div>
        </div>  
    </div>
    {/* ------------------------ Description and Review section --------------------- */}
    <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">Reviews (143)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nostrum minus dignissimos animi odio rem commodi praesentium doloremque deleniti fugiat.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam explicabo vitae harum voluptate in atque, quas obcaecati velit beatae mollitia voluptatum perspiciatis omnis, nemo laboriosam eos temporibus quae nisi sunt?</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae asperiores doloremque odio, deleniti, quisquam fuga debitis officia, unde natus saepe atque sed nobis? Numquam voluptates ducimus reiciendis harum, reprehenderit hic laudantium doloribus doloremque suscipit veritatis.</p>
        </div>
    </div>
    <div className="flex">
      <div className="flex order px-6 py-6 ">
                <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>

  </div>
  ) : <div className="opacity-0"></div>
};

export default Product;
