import { obtenerDeLocalStorage } from "../../../../data/storage.js";
import { $id, renderizarOpciones } from "../../../../shared/ui/index.js";
import { formController } from "../../init/init.js";

// Muestra el listado de jugadores en el <select>
// Si se pasa un jugador seleccionado, lo deja preseleccionado
export const mostrarJugadoresParaSeleccionar = (jugadorSeleccionado = null) => {
  const jugadores = obtenerDeLocalStorage("jugadores") || [];

  const select = $id("jugadores");
  if (!select) return;

  // Determina el id a seleccionar (puede ser null, string o un objeto con id)
  let idSeleccionado = "";
  if (jugadorSeleccionado) {
    idSeleccionado =
      typeof jugadorSeleccionado === "string"
        ? jugadorSeleccionado
        : jugadorSeleccionado.id;
  }

  renderizarOpciones({
    elemento: select,
    datos: jugadores,
    getTexto: (jugador) => `${jugador.nombre} ${jugador.apellido}`,
    getValor: (jugador) => jugador.id,
    defaultText: "Seleccionar jugador",
    valorSeleccionado: idSeleccionado,
    alSeleccionar: (id) => {
      const jugador = jugadores.find((j) => j.id === id);
      formController.reserva.jugador = id;
      formController.reserva.nombreJugador = jugador
        ? `${jugador.nombre} ${jugador.apellido}`
        : "";
    },
  });
};
