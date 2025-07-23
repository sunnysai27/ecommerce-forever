import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const {currency , products, backendUrl, token} = useContext(ShopContext);
  const [ordersData , setOrdersData] = useState([]);


  const getUserOrders = async () => {
    try {

      if(!token) return null;

      const response = await axios.post( backendUrl + "/api/orders/userorders", {} ,{headers : {token}});
      if(response.data.success) {
        let data = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            data.push(item);
          })
        })
        setOrdersData(data);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
    
  }

  useEffect( () => {
      getUserOrders();
  } , [token])

  return (
  <div className="border-t pt-16">
    <div className="text-2xl">
      <Title text1="MY" text2="ORDERS" />
    </div>

    <div>
      {
        ordersData.map((item, index) => (
          <div key={index} className=" border-b my-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "> 
            <div className="flex items-start text-sm gap-6 py-4">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="image" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700 "> 
                  <p className="text-lg">{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={getUserOrders} className="border px-4 py-2 font-medium text-sm rounded-sm hover:bg-black hover:text-white">Track Order</button>

            </div>

          </div>
        ))
      }
    </div>

  </div>);
};

export default Orders;
