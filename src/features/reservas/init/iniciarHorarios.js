import { obtenerDeLocalStorage } from "../../../data/storage.js";
import { obtenerTodasLasCanchasDisponibles } from "../data/canchas.js";
import { generarHorariosDelDia } from "../../../shared/helpers/fechas/generarHorariosDelDia.js";
import { obtenerHorariosConCanchaDisponible } from "../logic/disponibilidad/obtenerHorariosConCanchaDisponible.js";
import { mostrarHorariosDisponibles } from "../ui/components/mostrarHorariosDisponibles.js";

// Muestra los horarios del día en los que hay al menos una cancha libre
// según la fecha y duración seleccionadas
export const iniciarHorarios = async (fecha, duracion) => {
  const reservas = obtenerDeLocalStorage("reservas") || []; // Trae todas las reservas guardadas
  const canchas = await obtenerTodasLasCanchasDisponibles(); // Carga el catálogo de canchas
  const horarios = generarHorariosDelDia(); // Genera los horarios posibles del día

  const horariosFiltrados = obtenerHorariosConCanchaDisponible({
    horarios,
    fechaSeleccionada: fecha,
    duracionSeleccionada: duracion,
    reservasTotales: reservas,
    canchasDisponibles: canchas,
  });

  mostrarHorariosDisponibles(horariosFiltrados); // Muestra los horarios válidos en el UI

  return horariosFiltrados;
};

// Inicia los horarios con la fecha actual y duración por defecto (60 min)
export const iniciarHorariosPorDefecto = () => {
  const fecha = dayjs().format("YYYY-MM-DD");
  const duracion = 60;

  return iniciarHorarios(fecha, duracion);
};
