require('dotenv').config();
const express = require('express');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const reservasRoutes = require('./routes/reservasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Reservas de Hoteles',
      version: '1.0.0',
      description:
        'Documentación de la API para la gestión de reservas en hoteles',
      contact: {
        name: 'Alberto Barbano',
        url: 'http://localhost:5001',
        email: 'albertobarbanog@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Servidor de Desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos donde están definidas tus rutas
};

// Inicialización de Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para server la página contacto
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// Ruta para manejar el envío del formulario de contacto
app.post('/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Sin base de datos por el momento
  console.log(`Nombre: ${nombre}, Email: ${email}, Mensaje: ${mensaje}`);

  // Respuesta al cliente
  res.status(200).send('Formulario enviado con éxito.');
});

// Rutas de API para las reservas
app.use('/api/reservas', reservasRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
