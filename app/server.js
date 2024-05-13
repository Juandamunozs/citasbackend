const express = require('express');
const cors = require('cors'); // Importar el middleware cors

const router = require('./router/index');

const app = express();

app.use(express.json());

// Agregar el middleware cors para permitir todas las solicitudes CORS
app.use(cors({
    origin: 'http://localhost:8080', // Permitir solicitudes solo desde este origen
    methods: ['GET', 'POST'], // Permitir solo los métodos GET y POST
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir solo estos encabezados
  }));

app.get('/', (req, res) => {
    res.send('Servidor  de Medicitas Activo 🟢...');
});

// Se añade el prefijo '/api' antes de acceder a las rutas definidas en el router
app.use('/api', router);

const PUERTO = process.env.PUERTO || 3200;

app.listen(PUERTO, () => {
    console.log('🟢 - Servidor corriendo en el puerto', PUERTO);
});
