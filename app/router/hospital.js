var router = require('express').Router();
var HospitalController = require('../controller/HospitalController');

router.get('/', HospitalController.mostrar);
router.post('/', HospitalController.guardar);

module.exports = router;
