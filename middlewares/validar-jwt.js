const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            of: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify( token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            of: false,
            msg: 'Token no valido'
        });
    }
    //console.log(token);
     
}
module.exports = {
    validarJWT
}