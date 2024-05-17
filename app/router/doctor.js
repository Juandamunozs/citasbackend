var router = require('express').Router();
var DoctorController = require('../controller/DoctorController');

router.post('/', DoctorController.guardar);
router.post('/tipo_cita', DoctorController.mostrar);

module.exports = router;