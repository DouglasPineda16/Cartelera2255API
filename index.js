// index.js
const express = require('express');
const cors = require('cors');
const { serve, setup } = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const carteleraRoutes = require('./routes/cartelera.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger público
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.1',
    info: { title: 'API Parcial (GET-only)', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js']
});
app.use('/swagger', serve, setup(swaggerSpec));

// Rutas
app.use('/api/cartelera', carteleraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API escuchando en puerto ${PORT}`));
