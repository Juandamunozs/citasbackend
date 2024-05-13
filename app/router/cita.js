var router = require('express').Router();
var CitasController = require('../controller/CitaController');

router.post('/', CitasController.guardar);
router.get('/', CitasController.mostrar);
router.get('/fecha', CitasController.fecha);
module.exports = router;