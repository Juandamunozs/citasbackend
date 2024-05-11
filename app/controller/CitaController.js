const Cita= require('../model/Cita');
class CitaController{
    async guardar(req, res){
        const body = req.body;

     const citas = new Cita(body.nombre, body.apellido, body.cedula, body.numero_celular, body.email, body.direccion, body.fecha_nacimiento, body.genero);
       const res_guardar = await citas.guardar();
        res.json(res_guardar);

    }

    async mostrar(req, res){
       res.json(await Cita.listar()); 
    }
}

module.exports = new CitaController;