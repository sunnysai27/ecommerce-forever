import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token) {
            return res.json({success: false , msg: "UnAuthorized Access"});
        }
        
        const decode_token = jwt.verify(token , process.env.JWT_SECRET);
        if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false , msg: "UnAuthorized Access Admin"});
        }
        
        next();

    } catch (error) {
        console.log(error);
        res.json({success: false , msg: error.message});
    }
}

export default adminAuth;