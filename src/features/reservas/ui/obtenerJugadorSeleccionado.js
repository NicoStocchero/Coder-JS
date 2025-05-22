import { $id } from "../../../shared/ui/helpers/dom.js";

// Devuelve el ID y nombre del jugador actualmente seleccionado en el <select>
export const obtenerJugadorSeleccionado = () => {
  const selectJugador = $id("jugadores");

  return {
    idJugador: selectJugador?.value || "",
    nombreJugador:
      selectJugador?.options[selectJugador.selectedIndex]?.text || "",
  };
};
