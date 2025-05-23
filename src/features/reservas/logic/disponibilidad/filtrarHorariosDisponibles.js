import { haySuperposicion } from "../haySuperposicion.js";
import { crearIntervaloReserva } from "../../../../shared/helpers/fechas/crearIntervaloReserva.js";

// Filtra los horarios según:
// - Fecha seleccionada
// - Duración mínima
// - Reservas existentes en esa fecha
// Retorna solo los horarios habilitados y sin superposición
export const filtrarHorariosDisponibles = ({
  horarios,
  fechaSeleccionada,
  duracion,
  reservas,
  idReservaAExcluir = null,
}) => {
  const horariosDisponibles = [];

  for (const horario of horarios) {
    if (horario.disponible === false) continue; // Si ya está marcado como no disponible, se descarta

    const { inicio: horaInicio, fin: horaFin } = crearIntervaloReserva({
      fecha: fechaSeleccionada,
      horaInicio: horario.hora,
      duracion,
    });

    if (horaFin.isAfter(dayjs(`${fechaSeleccionada} 23:00`))) {
      continue; // Se descarta si se pasa del horario máximo permitido
    }

    let yaReservado = false;

    for (const reserva of reservas) {
      if (reserva.id === idReservaAExcluir) continue; // Se excluye la reserva que se está editando

      const inicioExistente = dayjs(`${fechaSeleccionada} ${reserva.hora}`);
      const finExistente = dayjs(`${fechaSeleccionada} ${reserva.horaFin}`);

      yaReservado = haySuperposicion(
        { inicio: horaInicio, fin: horaFin },
        { inicio: inicioExistente, fin: finExistente }
      );

      if (yaReservado) break; // Si hay superposición, se descarta el horario
    }

    if (!yaReservado) {
      horariosDisponibles.push({
        fecha: fechaSeleccionada,
        hora: horario.hora,
        horaFin: horaFin.format("HH:mm"),
        disponible: true,
      }); // Se agrega al array final si es válido
    }
  }

  return horariosDisponibles;
};
