import { crearIntervaloReserva } from "../../../../shared/helpers/fechas/crearIntervaloReserva.js";
import { haySuperposicion } from "../haySuperposicion.js";

export const comprobarReservaDisponible = ({
  cancha,
  fecha,
  hora,
  duracion,
  reservas,
}) => {
  const intervaloNuevo = crearIntervaloReserva({
    fecha,
    horaInicio: hora,
    duracion,
  });

  const reservasDeEsaCancha = reservas.filter(
    (reserva) => reserva.cancha === cancha && reserva.fecha === fecha
  );

  for (const reserva of reservasDeEsaCancha) {
    const intervaloExistente = crearIntervaloReserva({
      fecha: reserva.fecha,
      horaInicio: reserva.hora,
      duracion: reserva.duracion,
    });

    if (haySuperposicion(intervaloNuevo, intervaloExistente)) {
      return false;
    }
  }

  return true;
};
