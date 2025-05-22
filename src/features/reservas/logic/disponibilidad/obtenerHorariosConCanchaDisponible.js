import { filtrarHorariosDisponibles } from "./filtrarHorariosDisponibles.js";

// Devuelve los horarios en los que hay al menos una cancha libre,
// según la fecha y duración seleccionadas.
// Se usa antes de elegir una cancha específica.

export const obtenerHorariosConCanchaDisponible = ({
  horarios,
  fechaSeleccionada,
  duracionSeleccionada,
  reservasTotales,
  canchasDisponibles,
}) => {
  const horariosDisponibles = [];

  for (const horario of horarios) {
    let disponibleEnAlgunaCancha = false;

    for (const cancha of canchasDisponibles) {
      // Filtra las reservas para la cancha actual en esa fecha
      const reservasCanchas = reservasTotales.filter((reserva) => {
        return (
          reserva.cancha === cancha.nombre &&
          reserva.fecha === fechaSeleccionada
        );
      });

      // Verifica si ese horario está disponible en esa cancha
      const horariosFiltrados = filtrarHorariosDisponibles({
        horarios: [horario],
        fechaSeleccionada,
        duracion: duracionSeleccionada,
        reservas: reservasCanchas,
      });

      if (horariosFiltrados.length > 0) {
        disponibleEnAlgunaCancha = true;
        break; // Si al menos una cancha está libre, se guarda el horario
      }
    }

    if (disponibleEnAlgunaCancha) {
      horariosDisponibles.push({
        fecha: fechaSeleccionada,
        hora: horario.hora,
        disponible: true,
      }); // Se agrega el horario a mostrar en la UI
    }
  }

  return horariosDisponibles;
};
