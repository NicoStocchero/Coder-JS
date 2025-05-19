// Importaciones de reservas
import { mostrarJugadoresParaSeleccionar } from "../ui/mostrarJugadores.js";
import { generarFechasDisponibles } from "../../../helpers/fechas/generarFechasDisponibles.js";
import { mostrarFechasDisponibles } from "../ui/mostrarFechasDisponibles.js";
import { iniciarHorariosPorDefecto } from "./iniciarHorarios.js";
import { iniciarCanchas } from "./iniciarCanchas.js";
import { formularioNuevaReserva } from "../ui/formReservas.js";

/**
 * Inicializa el módulo de reservas:
 * - Renderiza jugadores, fechas, horarios y canchas
 * - Asocia eventos y ejecuta el formulario
 */

// Formulario de Reservas
export const initReservas = () => {
  // Inicializar el formulario de reservas
  formularioNuevaReserva();

  // Inicializar canchas
  iniciarCanchas();

  // Inicializar fechas disponibles
  const fechasDisponibles = generarFechasDisponibles();
  mostrarFechasDisponibles(fechasDisponibles);

  // Inicializar horarios por defecto
  iniciarHorariosPorDefecto();

  // Mostrar jugadores para seleccionar
  mostrarJugadoresParaSeleccionar();
};
