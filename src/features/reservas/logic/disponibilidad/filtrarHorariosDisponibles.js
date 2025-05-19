import { haySuperposicion } from "../../../../helpers/validation/haySuperposicion.js";
import { crearIntervaloReserva } from "../../../../helpers/fechas/crearIntervaloReserva.js";

/* Filtra los horarios disponibles según:
      - La fecha seleccionada
      - La duración mínima requerida
      - Las reservas existentes para esa fecha
  
  Devuelve un array de objetos que:
      - Están habilitados según lógica previa (disponible === true)
      - No se superponen con reservas existentes
      - Permiten completar la duración sin pasarse del horario máximo
      - Incluyen horaInicio, horaFin y la fecha correspondiente
  */
export const filtrarHorariosDisponibles = ({
  horarios,
  fechaSeleccionada,
  duracion,
  reservas,
}) => {
  const horariosDisponibles = [];

  for (const horario of horarios) {
    if (horario.disponible === false) continue; // Si no está disponible, se salta al siguiente horario

    const { inicio: horaInicio, fin: horaFin } = crearIntervaloReserva({
      fecha: fechaSeleccionada,
      horaInicio: horario.hora,
      duracion,
    });

    if (horaFin.isAfter(dayjs(`${fechaSeleccionada} 23:00`))) {
      continue; // Si la hora de fin es después de las 23:00, se salta al siguiente horario
    }

    let yaReservado = false;

    for (const reserva of reservas) {
      const inicioExistente = dayjs(`${fechaSeleccionada} ${reserva.hora}`); // Hora de inicio de la reserva existente
      const finExistente = dayjs(`${fechaSeleccionada} ${reserva.horaFin}`); // Hora de fin de la reserva existente

      yaReservado = haySuperposicion(
        { inicio: horaInicio, fin: horaFin },
        { inicio: inicioExistente, fin: finExistente }
      );

      if (yaReservado) {
        break; // Si ya está reservado, no es necesario seguir buscando
      }
    }

    if (!yaReservado) {
      horariosDisponibles.push({
        fecha: fechaSeleccionada,
        hora: horario.hora,
        horaFin: horaFin.format("HH:mm"),
        disponible: true,
      }); // Si no está reservado, se agrega al resultado
    }
  }
  return horariosDisponibles;
};
