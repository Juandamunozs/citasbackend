var mysql = require('mysql');
const Respuesta = require('../model/Respuesta');

const jsonConexion = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'citas',
    port: 3306
};

async function listar(query, tablas = false){
    let respuesta = new Respuesta();

    return new Promise((resolve, reject) => {
        try {
            var connection = mysql.createConnection(jsonConexion);

            connection.query(query, function(error, filas){
                connection.end();
                
                if(error){
                    respuesta.exito = false;
                    respuesta.estado = "400";
                    respuesta.mensaje = error.sqlMessage == undefined ? error.message : error.sqlMessage;
                    resolve(respuesta);
                    return;
                }
                
                respuesta.exito = true;
                respuesta.estado = 200;
                respuesta.mensaje = "exito";
                respuesta.resultado = !tablas ? filas[0] : filas;
                resolve(respuesta);
            });

        } catch (ex) {
            respuesta = { 
                exito: false,
                estado: 400,
                mensaje:'Error mysql: ' + ex,
                resultado:[]
            };
    
            resolve(respuesta);
        }
    })
    
}

async function ejecutar(query){
    let respuesta = new Respuesta();

    return new Promise((resolve, reject) => {
        try {
            var connection = mysql.createConnection(jsonConexion);
    
            connection.query(query, function(error, result){
                connection.end();

                if(error){
                    respuesta.exito = false;
                    respuesta.estado = "400";
                    respuesta.mensaje = error;
                    resolve(respuesta);
                    return;
                }            
                
                respuesta.exito = true;
                respuesta.estado = 200;
                respuesta.mensaje = "exito";
                respuesta.resultado = result;
                resolve(respuesta);
            });
        } catch (ex) {
            console.log(ex);
            respuesta = { 
                exito: false,
                estado: 400,
                mensaje:'Error mysql: ' + ex,
                resultado:[]
            };
    
            resolve(respuesta);
        }
    });

}

module.exports = {
    ejecutar: ejecutar,
    listar: listar
};