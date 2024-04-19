var router = require('express').Router();

var router_usuario = require('./usuario');
var router_hospital = require('./hospital');
//para entrar a la ruta se le debe agragar el prefijo / para entrar a la ruta usuario
router.use('/usuario', router_usuario);
router.use('/hospital', router_hospital);

module.exports = router;