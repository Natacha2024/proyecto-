const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuración de nodemailer (reemplaza con tu configuración de correo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_email@gmail.com',
        pass: 'tu_contraseña'
    }
});

// Middleware para analizar cuerpos de solicitud
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para procesar el formulario
app.post('/procesar_solicitud', (req, res) => {
    const { nombre, email, Telefono, comentario } = req.body;

    // Configura el correo electrónico que se enviará
    const mailOptions = {
        from: 'tu_email@gmail.com',
        to: 'destinatario@example.com',
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${Telefono}\nMensaje: ${comentario}`
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error al enviar el mensaje');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Mensaje enviado correctamente');
        }
    });
});

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
