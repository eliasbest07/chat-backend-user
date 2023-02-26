const { response } = require('express');
const Usuario = require('../models/usuario')
const controlador = async (req, res = response ) =>{
    const desde = Number( req.query.desde) || 0; // paginacion ?desde=5


   const usuarios = await Usuario
   .find({_id: { $ne: req.uid } })
   .sort('-online')
   .skip(desde) // a partir
   .limit(20) // hasta 
    return res.json({
                ok: true,
                usuarios,
                desde
            });
}

module.exports = {
    controlador
}