import { obtenerDatosBotones, setValue } from "../../../shared/ui/index.js";
import {
  actualizarTextoBoton,
  estadoFormularioReserva,
} from "./formReservas.js";
import { abrirSliderReserva } from "./components/abrirSliderReservas.js";

// Establece el modo edición y precarga los inputs con los datos de la reserva
export const prepararEdicionReserva = (reserva) => {
  estadoFormularioReserva.modoEdicion = true;
  estadoFormularioReserva.idReservaEditando = reserva.id;

  setValue("fecha-seleccionada", reserva.fecha);
  setValue("jugador-seleccionado", reserva.jugador);
  setValue("hora-seleccionada", reserva.hora);
  setValue("cancha-seleccionada", `${reserva.cancha}-${reserva.duracion}`);

  abrirSliderReserva(); // Abre el formulario deslizante para edición
};

// Marca visualmente los valores de la reserva en los botones seleccionables
export const marcarValoresEnFormulario = (reserva) => {
  obtenerDatosBotones({
    contenedorID: "fechas-disponibles",
    claseBoton: "btn-fecha",
    inputID: "fecha-seleccionada",
    datasetKey: "fecha",
    valorSeleccionado: reserva.fecha,
  });

  obtenerDatosBotones({
    contenedorID: "jugadores-disponibles",
    claseBoton: "btn-jugador",
    inputID: "jugador-seleccionado",
    datasetKey: "id",
    valorSeleccionado: reserva.jugador,
  });

  obtenerDatosBotones({
    contenedorID: "horarios-disponibles",
    claseBoton: "btn-horario",
    inputID: "hora-seleccionada",
    datasetKey: "hora",
    valorSeleccionado: reserva.hora,
  });

  obtenerDatosBotones({
    contenedorID: "canchas-disponibles",
    claseBoton: "btn-cancha",
    inputID: "cancha-seleccionada",
    datasetKey: "valor",
    valorSeleccionado: `${reserva.cancha}-${reserva.duracion}`,
  });

  actualizarTextoBoton(); // Cambia el texto del botón según el modo
};
