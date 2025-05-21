// Importaciones de reservas
import { mostrarJugadoresParaSeleccionar } from "../ui/mostrarJugadores.js";
import { generarFechasDisponibles } from "../../../shared/helpers/fechas/generarFechasDisponibles.js";
import { mostrarFechasDisponibles } from "../ui/mostrarFechasDisponibles.js";
import { iniciarHorariosPorDefecto } from "./iniciarHorarios.js";
import { iniciarCanchas } from "./iniciarCanchas.js";
import { formularioNuevaReserva } from "../ui/formReservas.js";
import {
  mostrarReservasRegistradas,
  manejarEventoEliminarReservas,
} from "../ui/mostrarReservas.js";
import {
  $id,
  manejarEventoEditar,
  manejarEventoEliminar,
} from "../../../shared/ui/index.js";
import { mostrarModalEditarReserva } from "../ui/mostrarModalEditarReserva.js";
import { iniciarSliderReserva } from "../ui/abrirSliderReservas.js";

/**
 * Inicializa el módulo de reservas:
 * - Renderiza jugadores, fechas, horarios y canchas
 * - Asocia eventos y ejecuta el formulario
 */

// Formulario de Reservas
export const initReservas = () => {
  iniciarSliderReserva();

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

  // Mostrar reservas registradas
  mostrarReservasRegistradas();

  // Manejar evento editar reservas
  manejarEventoEditar({
    contenedor: $id("lista-reservas"),
    tipo: "reservas",
    etiqueta: "reserva",
    selector: ".btn-editar-reserva",
    funcion: mostrarModalEditarReserva,
  });

  // Manejar evento eliminar reservas
  manejarEventoEliminarReservas();
};
