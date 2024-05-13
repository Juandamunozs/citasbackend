const Cita = require('../model/Cita');

class CitaController {
    async guardar(req, res) {
        const body = req.body;
        const citas = new Cita(body.nombre, body.apellido, body.cedula, body.numero_celular, body.email, body.direccion, body.fecha_nacimiento, body.genero);
        const res_guardar = await citas.guardar();
        res.json(res_guardar);
    }

    async mostrar(req, res) {
        res.json(await Cita.listar()); 
    }

    async fecha(req, res) {
        //const {segundo, minuto, hora, dia, mes, año} = req.body;

        const cita = await Cita.notificacion(/*segundo, minuto, hora, dia, mes, año*/);
        //console.log("Resultado de verificarCredenciales:", usuario);
       /* if (cita) {
            // Credenciales válidas, puedes iniciar sesión
            res.json({ mensaje: true, usuario });
        } else {
            // Credenciales inválidas
            res.json({ mensaje: false });
        } */
        res.json({cita})
    }
}

module.exports = new CitaController;



/*asi se consume la api es un get de fecha http://localhost:3200/api/cita/fecha*/