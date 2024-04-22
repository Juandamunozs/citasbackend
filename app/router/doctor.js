var router = require('express').Router();
var DoctorController = require('../controller/DoctorController');

router.post('/', DoctorController.guardar);
router.get('/', DoctorController.mostrar);

module.exports = router;