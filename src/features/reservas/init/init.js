// Importaciones de reservas
import { mostrarJugadoresParaSeleccionar } from "../ui/components/mostrarJugadores.js";
import { generarFechasDisponibles } from "../../../shared/helpers/fechas/generarFechasDisponibles.js";
import { mostrarFechasDisponibles } from "../ui/components/mostrarFechasDisponibles.js";
import { iniciarHorariosPorDefecto } from "./iniciarHorarios.js";
import { iniciarCanchas } from "./iniciarCanchas.js";
import { formularioNuevaReserva } from "../ui/formReservas.js";
import {
  mostrarReservasRegistradas,
  manejarEventoEliminarReservas,
} from "../ui/components/card/mostrarReservas.js";
import { iniciarSliderReserva } from "../ui/components/abrirSliderReservas.js";
import { iniciarEdicionReserva } from "./iniciarEdicionReserva.js";

// Inicializa el módulo de reservas:
// - Renderiza los componentes
// - Asocia los eventos
export const initReservas = () => {
  iniciarSliderReserva(); // Abre el formulario desde el botón flotante

  formularioNuevaReserva(); // Maneja envío del formulario de nueva reserva

  iniciarCanchas(); // Inicializa el listado de canchas

  mostrarFechasDisponibles(generarFechasDisponibles()); // Muestra fechas disponibles

  iniciarHorariosPorDefecto(); // Muestra los horarios del día actual

  mostrarJugadoresParaSeleccionar(); // Carga los jugadores para elegir

  mostrarReservasRegistradas(); // Muestra las reservas ya guardadas

  iniciarEdicionReserva(); // Asocia evento de edición a cada tarjeta

  manejarEventoEliminarReservas(); // Asocia evento de eliminación a cada tarjeta
};
