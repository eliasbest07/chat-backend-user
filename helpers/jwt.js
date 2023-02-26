const jwt = require('jsonwebtoken');

const generarJWT = ( uid )=>{
 return new Promise ( (resolve,reject)=>{
    const payload = {
        uid
     };
     jwt.sign(payload,process.env.JWT_KEY, {
        expiresIn: '48h',
     },(err,token)=>{
        if(err){
            // no se creo el token
            reject('no se genero el Json web Token');
        }else{
            // const token = await 
            resolve(token);
        }
     })
 });

}
const comprobarJWt = ( token = '')=>{
    try {
        const { uid } = jwt.verify( token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false,null];
    }
}
module.exports = {
    generarJWT,
    comprobarJWt
}