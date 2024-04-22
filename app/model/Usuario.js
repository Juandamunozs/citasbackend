const db = require('../src/db');
class Usuario{
    constructor(tipo_documento, user_name, password, name, email, edad, direccion, telefono){
        this.tipo_documento = tipo_documento;
        this.user_name = user_name;
        this.password = password;
        this.name = name;
        this.email = email;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    async guardar(){
        const query = `
        INSERT INTO citas.usuario 
        (
        tipoDocumento,
        username,
        password,
        name,
        email,
        edad,
        direccion,
        telefono)

        VALUES
        (
        '${this.tipo_documento}',
        '${this.user_name}',
        '${this.password}',
        '${this.name}',
        '${this.email}',
        '${this.edad}',
        '${this.direccion}',
        '${this.telefono}'
        );
    `;
       return await db.ejecutar(query); 
    }
    static async listar(){
        const query = `SELECT tipoDocumento, username, password FROM usuario;`

        return await db.listar(query, true) //asi se llama todos los usuarios
        //return await db.listar(query) asi se llama un usuario el 1
    }

    static async verificarCredenciales(tipo_documento, user_name, password) {
        const query = `SELECT * FROM usuario WHERE tipoDocumento = '${tipo_documento}' AND username = '${user_name}' AND password = '${password}';`;
        const respuesta = await db.listar(query);
        console.log("Consulta SQL:", query);
        console.log("Datos recibidos:", { tipo_documento, user_name, password });
        console.log("Datos devueltos:", respuesta);
        
        if (respuesta.exito && respuesta.resultado) {
            const usuarioEncontrado = respuesta.resultado;
            console.log("Usuario encontrado:", usuarioEncontrado);
            return usuarioEncontrado;
        } else {
            console.log("No se encontraron usuarios.");
            return null;
        }
    }
}

module.exports = Usuario;

/* la API usuario para crear cuenta se consume asi http://localhost:3200/api/usuario: */
/* La API usuario para loguearse se consume asi http://localhost:3200/api/usuario/login*/

//console.log("Consulta SQL:", query); // Agrega esta línea para imprimir la consulta SQL
//console.log("Datos recibidos:", { tipo_documento, user_name, password }); // Agrega esta línea para imprimir los datos recibidos
//console.log("Datos devueltos:", usuarios); // Agrega esta línea para imprimir los datos devueltos