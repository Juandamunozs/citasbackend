const Cita = require('../model/Cita');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

class CitaController {
    async guardar(req, res) {
        const body = req.body;
        const citas = new Cita(body.nombre, body.apellido, body.cedula, body.numero_celular, body.email, body.direccion, body.fecha_nacimiento, body.genero, body.hospital, body.doctor, body.notificacion);
        const res_guardar = await citas.guardar();
        res.json(res_guardar);
    }

    async mostrar(req, res) {
        res.json(await Cita.listar()); 
    }

    async fecha(req, res) {
        try {
            // Tu lógica para obtener la cita...
            const cita = await Cita.notificacion(/*segundo, minuto, hora, dia, mes, año*/); 
           res.json(cita);
            if (cita.resultado.length > 0) {
                cita.resultado.forEach(async (resultado, index) => {
                    const nombre = resultado.nombre;
                    const fecha = resultado.fechaNacimiento;
                    const email = resultado.email;
                    const hospital = resultado.hospital;
                    const doctor = resultado.doctor;
                    const apellido = resultado.apellido;

                    // Ruta relativa del logo de tu empresa dentro de la carpeta 'logo'
                    const logoPath = path.join(__dirname, 'logo', 'MediCitas.png');
                    // Lee el contenido de la imagen del logo
                    const logoContent = fs.readFileSync(logoPath);

                    // Configurar el transporte de correo
                    let transporter = nodemailer.createTransport({
                        service: 'Gmail', // Ejemplo: Gmail, SMTP
                        auth: {
                            user: 'medicitascali@gmail.com', // Coloca aquí tu dirección de correo electrónico
                            pass: 'qrwf jlwa yjdd zuyf' // Coloca aquí tu contraseña de correo electrónico
                        }
                    });

                    // Detalles del correo electrónico
                    let mailOptions = {
                        from: 'medicitascali@gmail.com', // Dirección del remitente
                        to: email, // Dirección del destinatario
                        subject: 'Recordatorio de MediCita', // Asunto del correo electrónico
                        text: 'Estimado '+ nombre + ' '+ apellido +' recuerde asistir a su cita programada para la fecha ' + fecha  + ' con el doctor '+ doctor +' en el hospital ' + hospital +' debe presentarse media hora antes de su cita con su documento de identidad.\n\nPara cualquier duda o consulta, por favor, comuníquese a medicitascali@gmail.com', // Cuerpo del correo electrónico
                        attachments: [
                            {
                                filename: 'MediCitas.png', // Nombre del archivo adjunto
                                content: logoContent, // Contenido de la imagen del logo
                                encoding: 'base64' // Codificación base64
                            }
                        ]
                    };

                    // Enviar el correo electrónico
                   
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
               const errorMessage = 'Error al enviar el correo a ' + nombre + ' ' + apellido + ' por :' + error;
               //console.log(errorMessage);
               res.status(500).json({ success: false, message: errorMessage });
        } else {
            const successMessage = 'Correo electrónico enviado a ' + nombre + ' ' + apellido + ' :' + info.response;
               //console.log(successMessage);
               res.json({ success: true, message: successMessage });
    }
});
                });
            } else {
               // console.log("No se encontraron resultados.");
            }
    
           // res.json(cita);
        } catch (error) {
            //console.error('Error al obtener la cita:', error);
            res.status(500).json({ error: 'Error al obtener la cita' });
        }
    }
}

module.exports = new CitaController;



/*asi se consume la api es un get de fecha http://localhost:3200/api/cita/fecha*/
/*instalar para enviar los correos npm install nodemailer*/