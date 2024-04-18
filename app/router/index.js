var router = require('express').Router();

var router_usuario = require('./usuario');
//para entrar a la ruta se le debe agragar el prefijo / para entrar a la ruta usuario
router.use('/usuario', router_usuario);

module.exports = router;