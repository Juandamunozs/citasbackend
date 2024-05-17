const Hospital = require('../model/Hospital');

class HospitalController {
    async guardar(req, res) {
        const body = req.body;

        const hospital = new Hospital(body.nombreHospital, body.direccionHospital, body.telefonoHospital);
        const res_guardar = await hospital.guardar();
        res.json(res_guardar);
    }

    async mostrar(req, res) {
        try {
            const hospitals = await Hospital.listar();

            if (hospitals.resultado.length > 0) {
                const nombresHospitales = hospitals.resultado.map(hospital => hospital.nombreHospital);
                res.json({ nombresHospitales }); // Sending an array of hospital names to the frontend
            } else {
                res.status(404).json({ message: "No se encontraron hospitales." });
            }
        } catch (error) {
            console.error("Error al obtener la lista de hospitales:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

module.exports = new HospitalController();