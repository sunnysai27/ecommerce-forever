import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-3/4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
            blanditiis.
          </p>
        </div>

        <div>
          <p className="font-medium text-xl  mb-5">COMPANY</p>
          <ul className="flex flex-col text-gray-700 gap-1">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col text-gray-700 gap-1">
            <li>+91-987567432</li>
            <li>E-mail</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ forever.com - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
