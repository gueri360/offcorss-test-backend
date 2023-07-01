import jwt from "jsonwebtoken"
export const requireToken = (req, res, next) =>{
    try {
        let token = req?.headers?.authorization;
        if(!token) throw new Error('error with the token');
        token = token.split(" ")
        const {uid} =jwt.verify(token[1], process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message})
    }
}