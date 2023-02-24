const { response } = require('express');
const bcrypt = require('bcryptjs'); 
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuarios = async (req, res = response)=>{
    const {email, password} = req.body;
    try {
        // encriptar contraseña
        const existeEmail = await Usuario.findOne({ email});
        if(existeEmail ){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario ( req.body );
        const salt =bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario.save(); // se guarda usuario en la tabla usuario 
        //Genrar JSON web token JWT
        const token = await generarJWT(usuario.id);
         res.json({
             ok: true,
             usuario,
             token
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error base de datos MongoDB'
        });
    }
}
const loginUsuario = async (req, res = response)=>{
const { email, password } = req.body;
    try {
    const usuarioDB = await Usuario.findOne({email});
    if( !usuarioDB){
        return res.status(404).json({
            ok:false,
            msg: 'correo no registrado'
        });
    }
    // validar password 
    const validadPassword = bcrypt.compareSync(password, usuarioDB.password);
    if(!validadPassword){
        return res.status(400).json({
            ok:false,
            msg: 'contraseña incorrecta'
        });
    }
    const tokenloging = await generarJWT(usuarioDB.id);
    res.json({
        ok: true,
        usuario: usuarioDB,
        tokenloging
    });
} catch (error) {
    return res.status(500).json({
        ok:false,
        msg: 'Error acceder al login 500'
    })
}
//    return res.json({
//         ok: true,
//         msg: 'Login',
//     });
}
const renewToken = async( req, res= response)=>{

    const uidUsuario= req.uid;
    const newToken = await generarJWT(uidUsuario);
    const usuarioOBDB =await Usuario.findById({_id:uidUsuario});
       return res.json({
        ok: true,
       usuario: usuarioOBDB,
       token:newToken
    });
}
module.exports = {
    crearUsuarios,
    loginUsuario,
    renewToken
}