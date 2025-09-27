// routes/cartelera.routes.js
const { Router } = require('express');
const c = require('../controllers/cartelera.controller');
const router = Router();

/**
 * @openapi
 * /api/cartelera:
 *   get:
 *     summary: Listar cartelera
 *     responses:
 *       200:
 *         description: Lista de películas
 */
router.get('/', c.getAll);

/**
 * @openapi
 * /api/cartelera/insert:
 *   get:
 *     summary: Insertar película (GET)
 *     parameters:
 *       - in: query
 *         name: imdbID
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: Title
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: Year
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: Type
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: Poster
 *         schema: { type: string }
 *       - in: query
 *         name: Estado
 *         required: true
 *         schema: { type: boolean }
 *       - in: query
 *         name: description
 *         schema: { type: string }
 *       - in: query
 *         name: Ubication
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Registro Insertado
 */
router.get('/insert', c.insertOne);

/**
 * @openapi
 * /api/cartelera/update:
 *   get:
 *     summary: Actualizar película (GET)
 *     parameters: [ { in: query, name: imdbID, required: true, schema: {type: string} } ]
 *     responses:
 *       200:
 *         description: Registro Actualizado
 */
router.get('/update', c.updateOne);

module.exports = router;
