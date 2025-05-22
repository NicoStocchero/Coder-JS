import { crearIntervaloReserva } from "../../../shared/helpers/fechas/crearIntervaloReserva.js";

// Genera una reserva completa con:
// - hora de fin calculada
// - ID único
// - separación de cancha y duración
export const generarReservaCompleta = (reserva) => {
  const intervalo = crearIntervaloReserva({
    fecha: reserva.fecha,
    horaInicio: reserva.hora,
    duracion: reserva.duracion,
  });

  const horaFin = intervalo.fin.format("HH:mm");
  const reservaID = crypto.randomUUID(); // ID único para guardar en localStorage

  const [nombreCancha, duracion] = reserva.cancha.split("-"); // Separa cancha y duración

  const reservaCompleta = {
    id: reservaID,
    jugador: reserva.jugador,
    nombre: reserva.nombre,
    fecha: reserva.fecha,
    hora: reserva.hora,
    duracion: duracion.trim(),
    cancha: nombreCancha.trim(),
    horaFin,
  };

  return reservaCompleta;
};
