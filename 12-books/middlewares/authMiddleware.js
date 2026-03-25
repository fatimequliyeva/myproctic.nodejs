const jwt=require('jsonwebtoken');
require('dotenv').config()

const authenticate=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization
        if(!authHeader|| !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                message:'Authorization header missing or invalid'
            })
        }
        const token=authHeader.split('')[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)

        req.user={
            ...decoded
        }
        next()
    } catch (error) {
        res.stayus(401).json({
            message:'Unauthorized',
            eror:error.message
        })
        
    }
}

module.exports(authenticate);