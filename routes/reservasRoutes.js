const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas (con filtros opcionales)
 *     description: Obtiene la lista de todas las reservas o las filtra por hotel, rango de fechas, tipo de habitación, estado o número de huéspedes.
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *         description: Filtrar por nombre del hotel.
 *         example: Hotel ChinaTown
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar reservas a partir de una fecha con formato YYYY-MM-DD.
 *         example: 2024-09-01
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar reservas hasta una fecha con formato YYYY-MM-DD.
 *         example: 2024-09-30
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         description: Filtrar por tipo de habitación (suite, doble, individual).
 *         example: suite
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtrar por estado de la reserva (confirmada, pendiente).
 *         example: confirmada
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Filtrar por número de huéspedes.
 *         example: 4
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista de reservas"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la reserva.
 *                         example: 1
 *                       hotel:
 *                         type: string
 *                         description: Nombre del hotel.
 *                         example: "Hotel ChinaTown"
 *                       fecha_reserva:
 *                         type: string
 *                         format: date
 *                         description: Fecha de la reserva.
 *                         example: "2024-09-15"
 *                       tipo_habitacion:
 *                         type: string
 *                         description: Tipo de habitación.
 *                         example: "doble"
 *                       num_huespedes:
 *                         type: integer
 *                         description: Número de huéspedes.
 *                         example: 2
 *                       estado:
 *                         type: string
 *                         description: Estado.
 *                         example: "confirmada"
 */
router.get('/', reservasController.obtenerReservas);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una nueva reserva en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *                 description: Nombre del hotel.
 *                 example: "Hotel ChinaTown"
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la reserva en formato YYYY-MM-DD.
 *                 example: "2024-09-15"
 *               tipo_habitacion:
 *                 type: string
 *                 description: Tipo de habitación (suite, doble).
 *                 example: "doble"
 *               num_huespedes:
 *                 type: integer
 *                 description: Número de huéspedes.
 *                 example: 2
 *     responses:
 *       201:
 *         description: Reserva creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva creada con éxito"
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la nueva reserva creada.
 *                       example: 1
 *                     hotel:
 *                       type: string
 *                       description: Nombre del hotel de la reserva.
 *                       example: "Hotel ChinaTown"
 *                     fecha_reserva:
 *                       type: string
 *                       format: date
 *                       description: Fecha de la reserva.
 *                       example: "2024-09-15"
 *                     tipo_habitacion:
 *                       type: string
 *                       description: Tipo de habitación reservada.
 *                       example: "doble"
 *                     num_huespedes:
 *                       type: integer
 *                       description: Número de huéspedes en la reserva.
 *                       example: 2
 */
router.post('/', reservasController.crearReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     description: Obtener los detalles de una reserva específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Detalles de la reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la reserva.
 *                     hotel:
 *                       type: string
 *                       description: Nombre del hotel.
 *                     fecha_reserva:
 *                       type: string
 *                       format: date
 *                       description: Fecha de la reserva.
 *                     tipo_habitacion:
 *                       type: string
 *                       description: Tipo de habitación.
 *                     num_huespedes:
 *                       type: integer
 *                       description: Número de huéspedes.
 *                     estado:
 *                       type: string
 *                       description: Estado de la reserva.
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', reservasController.obtenerReservaPorId);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     description: Permite actualizar una reserva específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *                 description: Nombre del hotel.
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la reserva.
 *               tipo_habitacion:
 *                 type: string
 *                 description: Tipo de habitación.
 *               num_huespedes:
 *                 type: integer
 *                 description: Número de huéspedes.
 *     responses:
 *       200:
 *         description: Reserva actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la reserva actualizada.
 *                     hotel:
 *                       type: string
 *                     fecha_reserva:
 *                       type: string
 *                       format: date
 *                     tipo_habitacion:
 *                       type: string
 *                     num_huespedes:
 *                       type: integer
 *                     estado:
 *                       type: string
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', reservasController.actualizarReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     description: Elimina una reserva específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', reservasController.eliminarReserva);

module.exports = router;
