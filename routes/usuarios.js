/*
path: api/usuarios
*/

const { Router } = require('express');
const { controlador } = require('../controllers/usuarios');
const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT, controlador);

module.exports = router;