import orderModel from "../models/orderModel.js";

// Placing orders using COD method
const placeOrder = async(req, res) => {
    try {

        const {userId, items, amount , address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address, 
            paymentMethod: "COD",
            payment: false,
            date : Date.now(),

        }
        
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await orderModel.findByIdAndUpdate(userId, {cartData: {}});

        res.json({success: true , msg: "Order Placed"});

        

    } catch (error) {
        console.log(error);
        res.json({success: false , msg: error.message});
        
    }

}

// Placing orders using Stripe method
const placeOrderStripe = async(req, res) => {
    try {
        const {userId, items, amount , address} = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address, 
            paymentMethod: "COD",
            payment: false,
            date : Date.now(),

        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();



    } catch (error) {
        
    }

}

// Placing orders using Razorpay method
const placeOrderRazorpay = async(req, res) => {

}

// All Orders data from admin panel
const allOrders = async(req, res) => {
    try {
        const allOrders = await orderModel.find({});
        res.json({success: true, allOrders});
    } catch (error) {
        console.log(error);
        res.json({success: false , msg:error.message});
    }

}

// User order data for frontend
const userOrders = async (req, res) => {

    try {
        const {userId} = req.body;

        const orders = await orderModel.find({userId});
        res.json({success : true, orders});
        
    } catch (error) {
        console.log(error);
        res.json({success: false , msg: error.message});
    }
    
}

// Update order status from Admin panel
const updateStatus = async(req, res) => {
    try {
        const {order_id, status} = req.body;

        await orderModel.findByIdAndUpdate(order_id, {status});
        res.json({success : true, msg: 'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success: false , msg: error.message});
    }
    


}

export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus};
