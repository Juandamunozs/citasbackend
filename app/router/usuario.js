var router = require('express').Router();
var UsuarioController = require('../controller/UsuarioController');

router.post('/', UsuarioController.guardar);
router.get('/', UsuarioController.mostrar);
router.get('/:documento', UsuarioController.mostrar);

module.exports = router;
