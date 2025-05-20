import { $id } from "../../../shared/ui/index.js";
import { obtenerJugadorSeleccionado } from "./obtenerJugadorSeleccionado.js";

export const obtenerDatosReserva = () => {
  const { idJugador, nombreJugador } = obtenerJugadorSeleccionado();

  return {
    jugador: idJugador,
    nombre: nombreJugador,
    fecha: $id("fecha-seleccionada")?.value || "",
    hora: $id("hora-seleccionada")?.value || "",
    duracion: $id("duracion-seleccionada")?.value || "",
    cancha: $id("cancha-seleccionada")?.value || "",
  };
};
