import { filtrarHorariosDisponibles } from "./filtrarHorariosDisponibles.js";

/* Devuelve los horarios del día en los que hay al menos una cancha libre, para la duración y fecha seleccionadas.

Se utiliza para mostrar al usuario los horarios posibles antes de elegir cancha.

Devuelve un array con:
   - hora y fecha
   - solo si al menos una cancha está libre para esa duración
*/

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
      const reservasCanchas = reservasTotales.filter(
        (reserva) =>
          reserva.cancha === cancha && reserva.fecha === fechaSeleccionada
      );

      const horariosFiltrados = filtrarHorariosDisponibles({
        horarios: [horario],
        fechaSeleccionada,
        duracion: duracionSeleccionada,
        reservas: reservasCanchas,
      }); // Filtra los horarios según la fecha seleccionada y las reservas existentes

      if (horariosFiltrados.length > 0) {
        disponibleEnAlgunaCancha = true;
        break; // Si hay al menos un horario disponible, no es necesario seguir buscando
      }
    }

    if (disponibleEnAlgunaCancha) {
      horariosDisponibles.push({
        fecha: fechaSeleccionada,
        hora: horario.hora,
        disponible: true,
      }); // Devuelve el horario si al menos una cancha está disponible para mostrar en la UI luego.
    }
  }

  return horariosDisponibles;
};
