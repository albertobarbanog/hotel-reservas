// Ejemplos
let reservas = [
  {
    id: 1,
    hotel: 'Hotel ChinaTown',
    fecha_reserva: '2024-09-15',
    tipo_habitacion: 'doble',
    num_huespedes: 2,
    estado: 'confirmada',
  },
  {
    id: 2,
    hotel: 'Hotel UDD',
    fecha_reserva: '2024-12-25',
    tipo_habitacion: 'suite',
    num_huespedes: 4,
    estado: 'pendiente',
  },
  {
    id: 3,
    hotel: 'Hotel Boric',
    fecha_reserva: '2023-06-07',
    tipo_habitacion: 'suite',
    num_huespedes: 4,
    estado: 'pendiente',
  },
  {
    id: 4,
    hotel: 'Hotel Full Stack',
    fecha_reserva: '2024-05-12',
    tipo_habitacion: 'single',
    num_huespedes: 6,
    estado: 'confirmada',
  },
];

// Obtener todas las reservas con filtros
exports.obtenerReservas = (req, res) => {
  let filtradas = reservas;

  // Captura de parámetros de consulta
  const {
    hotel,
    fecha_inicio,
    fecha_fin,
    tipo_habitacion,
    estado,
    num_huespedes,
  } = req.query;

  console.log('Parámetros recibidos:', req.query); // Verificar qué parámetros llegan

  // Filtrar por nombre de hotel
  if (hotel) {
    filtradas = filtradas.filter(
      reserva => reserva.hotel.toLowerCase() === hotel.toLowerCase()
    );
    console.log('Reservas después de filtrar por hotel:', filtradas);
  }

  // Filtrar por rango de fechas
  if (fecha_inicio && fecha_fin) {
    filtradas = filtradas.filter(
      reserva =>
        reserva.fecha_reserva >= fecha_inicio &&
        reserva.fecha_reserva <= fecha_fin
    );
    console.log('Reservas después de filtrar por rango de fechas:', filtradas);
  }

  // Filtrar por tipo de habitación
  if (tipo_habitacion) {
    console.log('Tipo de habitación recibido:', tipo_habitacion);
    console.log('Reservas antes del filtro por tipo de habitación:', filtradas);

    filtradas = filtradas.filter(
      reserva =>
        reserva.tipo_habitacion.toLowerCase() === tipo_habitacion.toLowerCase()
    );

    console.log(
      'Reservas después del filtro por tipo de habitación:',
      filtradas
    );
  }

  // Filtrar por estado de la reserva
  if (estado) {
    console.log('Estado recibido:', estado); // Verifica el estado que llega desde la URL
    console.log('Reservas antes del filtro por estado:', filtradas); // Verifica las reservas antes del filtro
    filtradas = filtradas.filter(
      reserva => reserva.estado.toLowerCase() === estado.toLowerCase()
    );
    console.log('Reservas después de filtrar por estado:', filtradas); // Verifica las reservas después del filtro
  }

  // Filtrar por número de huéspedes
  if (num_huespedes) {
    filtradas = filtradas.filter(
      reserva => reserva.num_huespedes == num_huespedes
    );
    console.log(
      'Reservas después de filtrar por número de huéspedes:',
      filtradas
    );
  }

  res.status(200).json({
    message: 'Lista de reservas',
    data: filtradas,
  });
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const reserva = reservas.find(r => r.id === id);
  if (reserva) {
    res.status(200).json({ message: 'Reserva encontrada', data: reserva });
  } else {
    res.status(404).json({ message: 'Reserva no encontrada' });
  }
};

// Crear una nueva reserva
exports.crearReserva = (req, res) => {
  const { hotel, fecha_reserva, tipo_habitacion, num_huespedes } = req.body;
  const nuevaReserva = {
    id: reservas.length + 1,
    hotel,
    fecha_reserva,
    tipo_habitacion,
    num_huespedes,
    estado: 'pendiente',
  };
  reservas.push(nuevaReserva);
  console.log('Nueva reserva creada:', nuevaReserva);
  res
    .status(201)
    .json({ message: 'Reserva creada con éxito', reserva: nuevaReserva });
};

// Actualizar una reserva existente
exports.actualizarReserva = (req, res) => {
  const id = parseInt(req.params.id);
  const { hotel, fecha_reserva, tipo_habitacion, num_huespedes, estado } =
    req.body;
  const reserva = reservas.find(r => r.id === id);

  if (reserva) {
    // Actualizamos loos campos que se envían en la solicitud
    reserva.hotel = hotel || reserva.hotel;
    reserva.fecha_reserva = fecha_reserva || reserva.fecha_reserva;
    reserva.tipo_habitacion = tipo_habitacion || reserva.tipo_habitacion;
    reserva.num_huespedes = num_huespedes || reserva.num_huespedes;
    reserva.estado = estado || reserva.estado;

    res.status(200).json({
      message: 'Reserva actualizada con éxito',
      data: reserva,
    });
  } else {
    res.status(404).json({
      message: 'Reserva no encontrada',
    });
  }
};

// Eliminar una reserva
exports.eliminarReserva = (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservas.findIndex(r => r.id === id);
  if (index !== -1) {
    reservas.splice(index, 1);
    console.log(`Reserva con ID ${id} eliminada`);
    res.status(200).json({ message: 'Reserva eliminada con éxito' });
  } else {
    res.status(404).json({ message: 'Reserva no encontrada' });
  }
};
