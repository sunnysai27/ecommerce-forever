import express from 'express';
import {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus} from "../controllers/orderController.js";
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post("/list" , adminAuth, allOrders);
orderRouter.post("/status" , adminAuth, updateStatus);

// payment routes
orderRouter.post("/place" , authUser, placeOrder);
orderRouter.post("/stripe" , authUser, placeOrderStripe);
orderRouter.post("/razorpay" , authUser, placeOrderRazorpay);

// Frontend data fetching api
orderRouter.post("/userorders", authUser , userOrders);




export default orderRouter;