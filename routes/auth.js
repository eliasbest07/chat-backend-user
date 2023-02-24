/* 
path:  api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
        
const { crearUsuarios, loginUsuario, renewToken  } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La clave es requerido').notEmpty(),
    validarCampos

] ,crearUsuarios);

router.post('/', [
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La clave es requerido').notEmpty(),
    validarCampos

] ,loginUsuario); // validarJWT,
router.get('/renew',validarJWT, renewToken );

module.exports = router;