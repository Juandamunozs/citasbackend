const Usuario = require('../model/Usuario');
class UsuarioController{
    async guardar(req, res){
        const body = req.body;

     const usuario = new Usuario(body.tipo_documento,body.user_name,body.password, body.name, body.email,body.edad, body.direccion, body.telefono);
       const res_guardar = await usuario.guardar();
        res.json(res_guardar);

    }

    async mostrar(req, res){
       res.json(await Usuario.listar()); 
    }

    async iniciarSesion(req, res) {
        const { tipo_documento, user_name, password } = req.body;
    
        // Agregar esta línea para mostrar los datos recibidos en la solicitud
       // res.json({ tipo_documento, user_name, password });
    
        const usuario = await Usuario.verificarCredenciales(tipo_documento, user_name, password);

        //console.log("Resultado de verificarCredenciales:", usuario);
        if (usuario) {
            // Credenciales válidas, puedes iniciar sesión
            res.json({ mensaje: true/*, usuario*/ });
        } else {
            // Credenciales inválidas
            res.status(401).json({ mensaje: false });
        }
    }

}

module.exports = new UsuarioController;