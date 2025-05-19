import { obtenerDeLocalStorage } from "../../../data/storage.js";
import { $id } from "../../../shared/ui/dom.js";
import { renderizarOpciones } from "../../../shared/ui/renderizarOpciones.js";

export const mostrarJugadoresParaSeleccionar = () => {
  const jugadores = obtenerDeLocalStorage("jugadores") || [];

  renderizarOpciones({
    elemento: $id("jugadores"),
    datos: jugadores,
    getTexto: (jugador) => `${jugador.nombre} ${jugador.apellido}`,
    getValor: (jugador) => jugador.id,
    defaultText: "Seleccionar jugador",
  });
};
