const Hospital = require('../model/Hospital');
class HospitalController{
    async guardar(req, res){
        const body = req.body;

     const hospital = new Hospital(body.nombreHospital, body.direccionHospital, body.telefonoHospital);
       const res_guardar = await hospital.guardar();
        res.json(res_guardar);

    }

    async mostrar(req, res){
       res.json(await Hospital.listar()); 
    }
}

module.exports = new HospitalController;