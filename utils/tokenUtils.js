import jwt from "jsonwebtoken"
// import jwt from "express-jwt"


export const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
    return token
//     const secret = process.env.JWT_SECRET;
//   const token = jwt(
//     {  
//         secret, 
//         algorithms: ["HS256"] 
//     },
//   ).unless({
//     path: [
//         {url: '/api/v1/products', methods: ['GET', 'OPTIONS']}
//     ]
//   });
//   return token;
};


export const verifyJWT =(token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}