const db = require('../src/db');
class Doctor{
    constructor(nombreDoctor, especialidad, disponibilidad){
        this.nombreDoctor= nombreDoctor;
        this.especialidad=especialidad;
        this.disponibilidad=disponibilidad;
    }
    
    async guardar(){
        const query = `
        INSERT INTO citas.doctor 
        (
        nombreDoctor,
        especialidad,
        disponibilidad
        )

        VALUES
        (
        '${this.nombreDoctor}',
        '${this.especialidad}',
        '${this.disponibilidad}'
        );
    `;
    return await db.ejecutar(query); 
    }

    static async listar(especialidad){

        const disponibilidad = "Si";
        const query = `SELECT nombreDoctor, especialidad, disponibilidad FROM doctor WHERE disponibilidad = '${disponibilidad}' && especialidad = '${especialidad}'`;

        const respuesta = await db.listar(query, true) 
        //console.log(respuesta);
        return respuesta;
    }
}

module.exports = Doctor;

