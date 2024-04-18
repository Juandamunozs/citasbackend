class Respuesta {
    constructor(exito, estado, mensaje, resultado){
        this.exito = exito;
        this.estado = estado;
        this.mensaje = mensaje;
        this.resultado = resultado;
    }
}

module.exports = Respuesta;