const optionallyVerifyToken = () => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return next();

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token" });
        }

        req.user = user;
        next();
    })
}


export default optionallyVerifyToken;