const db = require('../src/db');
class Citas{
    constructor(nombre, apellido, cedula, numero_celular, email, direccion, fecha_nacimiento, genero){
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.numero_celular = numero_celular;
        this.email = email;
        this.direccion = direccion;
        this.fecha_nacimiento = fecha_nacimiento;
        this.genero = genero;
    }

    async guardar(){
        const query = `
        INSERT INTO citas.cita
        (
        nombre,
        apellido,
        cedula,
        numeroCelular,
        email,
        fechaNacimiento,
        direccion,
        genero)

        VALUES
        (
        '${this.nombre}',
        '${this.apellido}',
        '${this.cedula}',
        '${this.numero_celular}',
        '${this.email}',
        '${this.fecha_nacimiento}',
        '${this.direccion}',
        '${this.genero}'
        );
    `;
       return await db.ejecutar(query); 
    }
    static async listar(){
        const query = `SELECT *FROM cita;`

        return await db.listar(query, true) //asi se llama todos los usuarios
        //return await db.listar(query) asi se llama un usuario el 1
    }

}

module.exports = Citas;