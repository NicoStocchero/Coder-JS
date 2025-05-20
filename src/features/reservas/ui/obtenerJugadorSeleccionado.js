import { $id } from "../../../shared/ui/helpers/dom.js";

export const obtenerJugadorSeleccionado = () => {
  const selectJugador = $id("jugadores");
  return {
    idJugador: selectJugador?.value || "",
    nombreJugador:
      selectJugador?.options[selectJugador.selectedIndex]?.text || "",
  };
};
