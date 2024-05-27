const Usuario = require('../model/Usuario');
class UsuarioController{
    async guardar(req, res){
        const body = req.body;
        const user_name = body.user_name;

       // console.log(user_name);

        const verificarExistencia = await Usuario.verificarCedula(user_name);

        if(verificarExistencia){

            const usuario = new Usuario(body.tipo_documento,body.user_name,body.password, body.name, body.email,body.edad, body.direccion, body.telefono);
            const res_guardar = await usuario.guardar();
             res.json(res_guardar);

        }else{
            res.json("existe");
        }

    }

    async mostrar(req, res){
       res.json(await Usuario.listar()); 
    }

    async iniciarSesion(req, res) {
        const { tipo_documento, user_name, password } = req.body;
    
        // Agregar esta línea para mostrar los datos recibidos en la solicitud
       // res.json({ tipo_documento, user_name, password });
    
        const resultado = await Usuario.verificarCredenciales(tipo_documento, user_name, password);
switch (resultado) {
    case 1:
        res.json(1);
        break;
    case 2:
        // No se encontraron usuarios con las credenciales proporcionadas, muestra una alerta o ofrece recuperar contraseña.
        //alert("Usuario no encontrado. ¿Quieres recuperar tu contraseña?");
        res.json(2);
        break;
    case 3:
        // La contraseña no coincide, ofrece recuperar la contraseña.
        res.json(3);
        break;
    default:
        // Manejar cualquier otro caso inesperado.
        break;
}

        
    }

}

module.exports = new UsuarioController;

/*
return true si es correcto inicia sin alerta.
return 2 si no coincide nada alerta
return 3 si no coincide contraseña 
*/