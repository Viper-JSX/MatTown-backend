import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h'/*'15s'*/ } );
    return token;
}

export default generateAccessToken;