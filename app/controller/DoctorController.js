const Doctor= require('../model/Doctor');
class DoctorController{
    async guardar(req, res){
        const body = req.body;

     const Doctor = new Doctor(body.nombreDoctor, body.especialidad, body.disponibilidad);
       const res_guardar = await doctor.guardar();
        res.json(res_guardar);

    }

    async mostrar(req, res){
       res.json(await Doctor.listar()); 
    }
}

module.exports = new DoctorController;