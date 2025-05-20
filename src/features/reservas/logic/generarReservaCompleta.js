import { crearIntervaloReserva } from "../../../shared/helpers/fechas/crearIntervaloReserva.js";

export const generarReservaCompleta = (reserva) => {
  const intervalo = crearIntervaloReserva({
    fecha: reserva.fecha,
    horaInicio: reserva.hora,
    duracion: reserva.duracion,
  });
  const horaFin = intervalo.fin.format("HH:mm");

  const reservaID = crypto.randomUUID();
  const [nombreCancha, duracion] = reserva.cancha.split("-");

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
