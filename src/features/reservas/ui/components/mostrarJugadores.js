import { obtenerDeLocalStorage } from "../../../../data/storage.js";
import { $id, renderizarOpciones } from "../../../../shared/ui/index.js";

// Muestra el listado de jugadores en el <select>
// Si se pasa un jugador seleccionado, lo deja preseleccionado
export const mostrarJugadoresParaSeleccionar = (jugadorSeleccionado = null) => {
  const jugadores = obtenerDeLocalStorage("jugadores") || [];

  const select = $id("jugadores");
  if (!select) return;

  renderizarOpciones({
    elemento: select,
    datos: jugadores,
    getTexto: (jugador) => `${jugador.nombre} ${jugador.apellido}`,
    getValor: (jugador) => jugador.id,
    defaultText: "Seleccionar jugador",
  });

  if (jugadorSeleccionado) {
    select.value = jugadorSeleccionado;
  }
};
