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

    static async listar(){
        const query = `SELECT nombreDoctor, especialidad, disponibilidad FROM doctor;`

        return await db.listar(query, true) 
    }
}

module.exports = Doctor;

