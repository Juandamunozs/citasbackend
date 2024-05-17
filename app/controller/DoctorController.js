const Doctor= require('../model/Doctor');
class DoctorController{
    async guardar(req, res){
        const body = req.body;

     const doctor = new Doctor(body.nombreDoctor, body.especialidad, body.disponibilidad);
       const res_guardar = await doctor.guardar();
        res.json(res_guardar);

    }

    async mostrar(req, res) {
        const { especialidad } = req.body;
        try {
            const doctores = await Doctor.listar(especialidad);

            if (doctores.resultado.length > 0) {
                // Mapping doctors to the expected structure
                const medicosDisponibles = doctores.resultado.map(doctor => ({
                    id: doctor.id,
                    nombre: doctor.nombreDoctor
                }));
                res.json({ medicosDisponibles });
            } else {
                res.status(404).json({ message: "No se encontraron doctores." });
            }
        } catch (error) {
            console.error("Error al obtener la lista de doctores:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

module.exports = new DoctorController;