// Importaciones base
import { mostrarJugadoresParaSeleccionar } from "../ui/components/mostrarJugadores.js";
import { generarFechasDisponibles } from "../../../shared/helpers/fechas/generarFechasDisponibles.js";
import { mostrarFechasDisponibles } from "../ui/components/mostrarFechasDisponibles.js";
import { iniciarCanchas } from "./iniciarCanchas.js";
import { formularioNuevaReserva } from "../ui/formReservas.js";
import {
  mostrarReservasRegistradas,
  manejarEventoEliminarReservas,
} from "../ui/components/card/mostrarReservas.js";
import { iniciarSliderReserva } from "../ui/components/abrirSliderReservas.js";
import { iniciarEdicionReserva } from "./iniciarEdicionReserva.js";
import { FormController } from "../logic/class/FormController.js";

// Instanciación global del controlador
export const formController = new FormController();

export const initReservas = () => {
  iniciarSliderReserva();
  formularioNuevaReserva();
  iniciarCanchas();

  // 🔹 Configuración inicial
  const fechaHoy = dayjs().format("YYYY-MM-DD");
  const fechas = generarFechasDisponibles();

  formController.reserva.fecha = fechaHoy;
  formController.reserva.duracion = 60;

  // 🔹 Mostrar fechas y simular selección
  mostrarFechasDisponibles(fechas, fechaHoy);

  // 🔹 Resto del flujo
  mostrarJugadoresParaSeleccionar();
  mostrarReservasRegistradas();
  iniciarEdicionReserva();
  manejarEventoEliminarReservas();

  // 🔹 Render inicial (puede disparar horarios/canchas si fecha+duración ya están)
  formController.renderFormulario();
};
