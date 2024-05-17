var router = require('express').Router();
var CitasController = require('../controller/CitaController');

router.post('/', CitasController.guardar);
router.post('/listar', CitasController.mostrar);
router.get('/fecha', CitasController.fecha);
router.post('/borrarCita', CitasController.borrar);
module.exports = router;