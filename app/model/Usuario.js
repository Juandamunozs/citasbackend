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
}

module.exports = Usuario;