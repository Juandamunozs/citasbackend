const Cita = require('../model/Cita');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

function generarCodigo() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 4; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

class CitaController {

    async guardar(req, res) {
        const body = req.body;
    
        const fecha = body.fecha_cita;
        const hora = body.hora_cita;
        const cedula = body.cedula;
        const nombre = body.nombre;
    
        const verificarUsuario = await Cita.verificarUsuario(fecha, hora);
        const verificarUserCedula = await Cita.verificarUserCedula(nombre, cedula);
    
        if (!verificarUserCedula) {

            if (!verificarUsuario) {
                const codigo = generarCodigo();
    
                const citas = new Cita(body.nombre, body.apellido, body.cedula, body.numero_celular, body.email, body.direccion, body.fecha_cita, body.genero, body.hospital, body.doctor, body.notificacion, body.tipo_cita, body.hora_cita, codigo);
    
                try {
                    const res_guardar = await citas.guardar();
                    //console.log(codigo);
    
                    //console.log(res_guardar.respuesta);
                    // Si la cita se guarda correctamente, enviar el correo
                    if (res_guardar.exito && res_guardar.estado === 200) {
                        const actualizarDoctor = await Cita.actualizarDoctor(codigo);
                        //console.log(actualizarDoctor);
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
                            to: body.email, // Dirección del destinatario
                            subject: 'Confirmación de cita en MediCita', // Asunto del correo electrónico
                            text: `Estimado(a) ${body.nombre} ${body.apellido}, su cita ha sido confirmada para la fecha ${body.fecha_cita} a las ${body.hora_cita} con el doctor ${body.doctor} en el hospital ${body.hospital}. Su código de cita es ${codigo}. Por favor, preséntese media hora antes de su cita con su documento de identidad, el codigo es de utilidad para consultar datos o eliminar su cita en la web de MediCitas.\n\nPara cualquier duda o consulta, por favor, comuníquese a medicitascali@gmail.com`, // Cuerpo del correo electrónico
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
                                const errorMessage = `Error al enviar el correo a ${body.nombre} ${body.apellido} por: ${error}`;
                                res.status(500).json({ success: false, message: errorMessage });
                            } else {
                                const successMessage = `Correo electrónico enviado a ${body.nombre} ${body.apellido}: ${info.response}`;
                                res.json(2);
                            }
                        });
                    } else {
                        res.json(res_guardar);
                    }
                } catch (error) {
                    res.status(500).json({ success: false, message: 'Error al guardar la cita', error });
                }
            } else {
                res.json("Tiempo ocupado");
            }
        } else {
            res.json("Cedula no Existente");
        }
    }
    

    

    async mostrar(req, res) {
        const { codigo } = req.body;
        const consultar = await Cita.consultar(codigo);
        res.json(consultar);
    }

    async borrar(req, res) {
        const { codigo } = req.body;
        const borrar = await Cita.borrarCita(codigo);
        res.json(borrar);
    }

    async fecha(req, res) {
        try {
            const cita = await Cita.notificacion();
            res.json(cita);
            if (cita.resultado.length > 0) {
                cita.resultado.forEach(async (resultado) => {
                    const nombre = resultado.nombre;
                    const fecha = resultado.fechaCita;
                    const email = resultado.email;
                    const hospital = resultado.hospital;
                    const doctor = resultado.doctor;
                    const apellido = resultado.apellido;
                    const hora = resultado.horaCita;
                    const codigo = resultado.codigo;

                    const logoPath = path.join(__dirname, 'logo', 'MediCitas.png');
                    const logoContent = fs.readFileSync(logoPath);

                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'medicitascali@gmail.com',
                            pass: 'qrwf jlwa yjdd zuyf'
                        }
                    });

                    let mailOptions = {
                        from: 'medicitascali@gmail.com',
                        to: email,
                        subject: 'Recordatorio de MediCita',
                        text: `Estimado(a) ${nombre} ${apellido}, recuerde asistir a su cita asignada con el codigo ${codigo} para la fecha ${fecha} a las ${hora} con el doctor ${doctor} en el hospital ${hospital}. Debe presentarse media hora antes de su cita con su documento de identidad.\n\nPara cualquier duda o consulta, por favor, comuníquese a medicitascali@gmail.com`,
                        attachments: [
                            {
                                filename: 'MediCitas.png',
                                content: logoContent,
                                encoding: 'base64'
                            }
                        ]
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            const errorMessage = `Error al enviar el correo a ${nombre} ${apellido} por: ${error}`;
                            res.status(500).json({ success: false, message: errorMessage });
                        } else {
                            const successMessage = `Correo electrónico enviado a ${nombre} ${apellido}: ${info.response}`;
                            res.json({ success: true, message: successMessage });
                        }
                    });
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la cita' });
        }
    }
}

module.exports = new CitaController;



/*asi se consume la api es un get de fecha http://localhost:3200/api/cita/fecha*/
/*instalar para enviar los correos npm install nodemailer*/