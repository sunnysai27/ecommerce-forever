import React, { useContext, useState } from "react";
import {Title} from '../components/Title';
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl, token , cartItems, setCartItems, getCartAmount , delivery_fee, products} = useContext(ShopContext);

  const[formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "" ,
    country: "" ,
    phone: ""
  });


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data , [name]:value}));
  }
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      
      let orderItems = [];

      for(const items in cartItems) {
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log(orderItems);

      let orderData = {
        address : formData,
        items: orderItems,
        amount : getCartAmount() + delivery_fee

      }

      switch(method) {
          case'cod':
            const response = await axios.post( backendUrl + '/api/orders/place' , orderData , { headers : {token}});
            console.log(response.data);
            
            if(response.data.success) {
              setCartItems({});
              navigate('/orders')
              toast.success(response.data.msg);
            }
            else{
              toast.error(response.data.msg);
            }

          break;

          default: 
          break;
      }


    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh] border-t" >
      {/* ---------------Left side --------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]"> 

        <div className="text-xl sm:text-2xl my-3"> 
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="First Name" type="text" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Last Name" type="text" />
        </div> 
          <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email address" type="email" />
          <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" type="text" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" type="text" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" type="text" />
        </div> 
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Zip code" type="number" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" type="text" />
        </div> 
          <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone Number" type="number" />

      </div>
      {/* -------------- Right side ------------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
          <div className="mt-12"> 
            <Title text1={"PAYMENT"} text2={"METHOD"}/>
            {/* ------------ payment method section ----------------- */}
            <div className="flex flex-col gap-3 lg:flex-row">
              <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 p-2 px-3 border cursor-pointer ">
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`} ></p>
                  <img className="h-5 mx-4" src={assets.stripe_logo} alt="stripe" />
              </div>
              <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 p-2 px-3 border cursor-pointer ">
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`} ></p>
                  <img className="h-5 mx-4" src={assets.razorpay_logo} alt="razorpay" />
              </div>
              <div onClick={() => setMethod("cod")} className="flex items-center gap-3 p-2 px-3 border cursor-pointer ">
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`} ></p>
                  <p className="text-gray-500 text-sm font-medium mx-4 "  >CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
                <button type="submit"  className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
            </div>
          </div>
        </div>

      </div>

    </form>);
};

export default PlaceOrder;
