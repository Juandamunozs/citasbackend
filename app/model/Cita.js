const db = require('../src/db');
class Cita{
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
    
    
    static async notificacion(/*segundo, minuto, hora, dia, mes, año*/) {
        
        var ahora = new Date();
        var diaA = ahora.getDate();
        var mesA = ahora.getMonth() + 1; // Los meses comienzan desde 0
        var añoA = ahora.getFullYear();
        /*var horaA = ahora.getHours();
        var minutoA = ahora.getMinutes();
        var segundoA = ahora.getSeconds();*/

        const fecha = `${añoA}-${mesA < 10 ? '0' : ''}${mesA}-${diaA < 10 ? '0' : ''}${diaA}`;
       // console.log(fecha);
        const query = `SELECT cedula, fechaNacimiento, nombre FROM cita WHERE fechaNacimiento = '${fecha}'`;
        const respuesta = await db.listar(query, true);
        return respuesta;

        //const años = año - añoA;
        //console.log("Años " + años);
       //const meses = mes - mesA;
        //console.log("Meses " + meses);
        //const dias = dia - diaA;
       // console.log("Días " + dias);
        //const horas = hora - horaA;
       // console.log("Horas " + horas);
        
        // Comprueba si faltan 24 horas o menos para la fecha especificada
       // if (años == 0 && meses == 0 && dias <= 1 && (dias < 1 /*|| (dias == 1 && horas <= 0*/)) {
            // Si falta 24 horas o menos, devuelve true
         //   console.log(true);
          //  return true;
       // } else {
            // Si falta más de 24 horas, devuelve false
            //console.log(false);
           // return false;
       // }
    }
}

module.exports = Cita;