const db = require('../src/db');
class Cita{
    constructor(nombre, apellido, cedula, numero_celular, email, direccion, fecha_cita, genero, hospital, doctor, notificacion, tipo_cita, hora_cita, codigo){
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.numero_celular = numero_celular;
        this.email = email;
        this.direccion = direccion;
        this.fecha_cita = fecha_cita;
        this.genero = genero;
        this.hospital = hospital;
        this.doctor = doctor;
        this.notificacion = notificacion = "No";
        this.tipo_cita = tipo_cita;
        this.hora_cita = hora_cita;
        this.codigo = codigo
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
        fechaCita,
        direccion,
        genero,
        hospital,
        doctor,
        notificacion,
        tipoCita,
        horaCita,
        codigo
    )

        VALUES
        (
        '${this.nombre}',
        '${this.apellido}',
        '${this.cedula}',
        '${this.numero_celular}',
        '${this.email}',
        '${this.fecha_cita}',
        '${this.direccion}',
        '${this.genero}',
        '${this.hospital}',
        '${this.doctor}',
        '${this.notificacion}',
        '${this.tipo_cita}',
        '${this.hora_cita}',
        '${this.codigo}'
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
        
        const notificacion = "No";
        var ahora = new Date();
        var diaA = ahora.getDate();
        var mesA = ahora.getMonth() + 1; // Los meses comienzan desde 0
        var añoA = ahora.getFullYear();
        var horaA = ahora.getHours();
        var minutoA = ahora.getMinutes();
        /*var segundoA = ahora.getSeconds();*/

        const hora = horaA + ":" + minutoA;
        const fecha = `${añoA}-${mesA < 10 ? '0' : ''}${mesA}-${diaA < 10 ? '0' : ''}${diaA}`;
       // console.log(fecha);
        const query = `SELECT cedula, fechaCita, nombre, apellido, email, doctor, horaCita, hospital, codigo FROM cita WHERE fechaCita = '${fecha}' && horaCita = '${hora}' && notificacion = '${notificacion}'`;
        const respuesta = await db.listar(query, true);

        if (respuesta.resultado.length > 0) {
            respuesta.resultado.forEach(async (cita, index) => {
                const cedula = cita.cedula;
        
                // Construir y ejecutar la consulta de actualización
                const updateQuery = `UPDATE cita SET notificacion = 'Si' WHERE cedula = '${cedula}'`;
                await db.ejecutar(updateQuery);
                //console.log("Cita actualizada:", cedula);
            });
        }

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

    static async borrarCita(codigo) {
        try {
           // Formar la consulta SQL para verificar si la cita existe
            const existeQuery = `SELECT codigo, doctor FROM cita WHERE codigo = '${codigo}'`;
            // Ejecutar la consulta para verificar si la cita existe
            const respuesta = await db.listar(existeQuery, true);
            //console.log(respuesta);
            // Verificar si la cita existe
            if (respuesta.resultado.length > 0) {
                // Si la cita existe, formar la consulta SQL para borrarla*/
                const doctor = respuesta.resultado[0].doctor;
                //console.log(doctor);
                const updateQuery = `UPDATE doctor SET disponibilidad = 'Si' WHERE nombreDoctor = '${doctor}'`;
                const borrarQuery = `DELETE FROM cita WHERE codigo = '${codigo}'`;
                // Ejecutar la consulta para borrar la cita
                await db.ejecutar(updateQuery);
                await db.ejecutar(borrarQuery);
                
                // Devolver un mensaje indicando que la cita se ha borrado correctamente
                return { mensaje: "La cita se ha borrado correctamente." }
            } else {
                // Si la cita no existe, devolver un mensaje indicando que no se encontró la cita
                return { mensaje: "La cita no existe." };
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            console.error("Error al intentar borrar la cita:", error);
            return { mensaje: "Ha ocurrido un error al intentar borrar la cita." };
        }
    }
  
    static async consultar(codigo) {
        const query = `SELECT nombre, tipoCita, hospital, doctor, fechaCita, horaCita FROM cita WHERE codigo = '${codigo}'`;
        const respuesta = await db.listar(query, true);
        try {
            
            // Si la consulta se ejecutó correctamente, devolver true indicando que la cita se eliminó correctamente.
            return respuesta;
        } catch (error) {
            // Si hubo un error al ejecutar la consulta, devolver false indicando que la cita no se eliminó.
            console.error("Error al borrar la cita:", error);
            return false;
        }
    }
    
    static async actualizarDoctor(codigo) {
        try {
            const query = `SELECT doctor FROM cita WHERE codigo = '${codigo}'`;
            const respuesta = await db.listar(query, true);
    
            if (respuesta.resultado.length > 0) {
                const doctor = respuesta.resultado[0].doctor;
                const updateQuery = `UPDATE doctor SET disponibilidad = 'No' WHERE nombreDoctor = '${doctor}' `;
                await db.ejecutar(updateQuery);
                
                // Si la consulta se ejecutó correctamente, devolver un mensaje indicando que la cita se actualizó correctamente.
                return { mensaje: "La disponibilidad del doctor se ha actualizado correctamente." };
            } else {
                // Si la cita no existe, devolver un mensaje indicando que no se encontró la cita.
                return { mensaje: "La cita no existe." };
            }
        } catch (error) {
            // Si hubo un error al ejecutar la consulta, devolver un mensaje indicando el error.
            console.error("Error al actualizar la disponibilidad del doctor:", error);
            return { mensaje: "Ha ocurrido un error al actualizar la disponibilidad del doctor." };
        }
    }
    static async verificarUsuario(fecha, hora) {
            const query = `SELECT nombre, cedula, genero FROM cita WHERE fechaCita = '${fecha}' AND horaCita = '${hora}'`;
            const respuesta = await db.listar(query);
            console.log(respuesta);
            console.log(query);
        
            if (respuesta.exito && respuesta.resultado) {
                // Si se encontró un usuario con la fecha y hora proporcionados
                return false;
            } else {
                // Si no se encontraron usuarios con las credenciales proporcionadas
                return true;
            }
   }
}

module.exports = Cita;