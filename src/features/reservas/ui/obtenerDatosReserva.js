import { $id } from "../../../shared/ui/index.js";
import { obtenerJugadorSeleccionado } from "./obtenerJugadorSeleccionado.js";

// Recolecta los datos actuales del formulario de reserva
export const obtenerDatosReserva = () => {
  const { idJugador, nombreJugador } = obtenerJugadorSeleccionado(); // Datos del jugador seleccionado

  const reserva = {
    jugador: idJugador,
    nombre: nombreJugador,
    fecha: $id("fecha-seleccionada")?.value || "",
    hora: $id("hora-seleccionada")?.value || "",
    duracion: $id("duracion-seleccionada")?.value || "",
    cancha: $id("cancha-seleccionada")?.value || "",
  };

  return reserva;
};
