const Usuario = require('../model/Usuario');
class UsuarioController{
    async guardar(req, res){
        const body = req.body;

     const usuario = new Usuario(body.tipo_documento,body.user_name,body.password, body.name, body.email,body.edad, body.direccion, body.telefono);
       const res_guardar = await usuario.guardar();
        res.json(res_guardar);

    }

    async mostrar(req, res){
       res.json(await Usuario.listar()); //asincrono
    }
}

module.exports = new UsuarioController;