var router = require('express').Router();
var CitasController = require('../controller/CitasController');

router.post('/', CitasController.guardar);
router.get('/', CitasController.mostrar);

module.exports = router;