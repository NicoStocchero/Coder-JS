import { crearIntervaloReserva } from "../../../../shared/helpers/fechas/crearIntervaloReserva.js";
import { haySuperposicion } from "../haySuperposicion.js";

// Comprueba si una reserva nueva se superpone con las ya existentes para una misma cancha y fecha

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

  // Filtra solo las reservas que coinciden con la misma cancha y fecha
  const reservasDeEsaCancha = reservas.filter(
    (reserva) => reserva.cancha === cancha && reserva.fecha === fecha
  );

  // Recorre las reservas existentes y compara intervalos
  for (const reserva of reservasDeEsaCancha) {
    const intervaloExistente = crearIntervaloReserva({
      fecha: reserva.fecha,
      horaInicio: reserva.hora,
      duracion: reserva.duracion,
    });

    if (haySuperposicion(intervaloNuevo, intervaloExistente)) {
      return false; // Hay superposición, no se puede reservar
    }
  }

  return true; // No hay conflicto, se puede reservar
};
