import jwt from "jsonwebtoken";

export async function isAuthenticated(req,res,next){

    try {
        // console.log(req.cookies);
        const {token}=req.cookies;
        if(!token){
            return res.status(401).send({
                message:"User not authenticated!",
                success:false
    
            })
        }
    
        const decode= await jwt.verify(token,process.env.TOKEN_SECRET)
        // console.log( decode);
        req.user=decode.id;
        next();
         
    } catch (error) {
        res.status(500).send({
            message:"Error while auhenticating",
            success:false,
            error:error.message
        })
    }
    
    
}