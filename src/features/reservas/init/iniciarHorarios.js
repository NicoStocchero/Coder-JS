import { obtenerDeLocalStorage } from "../../../data/storage.js";
import { obtenerTodasLasCanchasDisponibles } from "../data/canchas.js";
import { generarHorariosDelDia } from "../../../helpers/fechas/generarHorariosDelDia.js";
import { obtenerHorariosConCanchaDisponible } from "../logic/disponibilidad/obtenerHorariosConCanchaDisponible.js";
import { mostrarHorariosDisponibles } from "../ui/mostrarHorariosDisponibles.js";

export const iniciarHorarios = async (fecha, duracion) => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  const canchas = await obtenerTodasLasCanchasDisponibles();
  const horarios = generarHorariosDelDia();

  const horariosFiltrados = obtenerHorariosConCanchaDisponible({
    horarios,
    fechaSeleccionada: fecha,
    duracionSeleccionada: duracion,
    reservasTotales: reservas,
    canchasDisponibles: canchas,
  });

  mostrarHorariosDisponibles(horariosFiltrados);

  return horariosFiltrados;
};

export const iniciarHorariosPorDefecto = () => {
  const fecha = dayjs().format("YYYY-MM-DD");
  const duracion = 60; // Duración por defecto de 60 minutos

  return iniciarHorarios(fecha, duracion);
};
