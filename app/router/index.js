var router = require('express').Router();

var router_usuario = require('./usuario');
var router_hospital = require('./hospital');
var router_doctor = require('./doctor');
var router_citas = require('./citas');
//para entrar a la ruta se le debe agragar el prefijo / para entrar a la ruta usuario
router.use('/usuario', router_usuario);
router.use('/hospital', router_hospital);
router.use('/doctor', router_doctor);
router.use('/citas', router_citas);

module.exports = router;