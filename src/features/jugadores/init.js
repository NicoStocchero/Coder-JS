// Importaciones de formulario de Jugador
import { formularioNuevoJugador } from "./formJugadores.js"; // Importa el formulario de jugadores
import {
  manejarEventoEliminarJugadores,
  renderizarJugadores,
} from "./ui/cargarJugadores.js"; // Importa la función para mostrar jugadores registrados
import { mostrarModalEditarJugador } from "./ui/editarJugador.js";
import { $id, manejarEventoEditar } from "../../shared/ui/index.js";

export const initJugadores = () => {
  // Ejecutar formulario de jugadores
  formularioNuevoJugador();

  // Manejar evento editar jugadores
  manejarEventoEditar({
    contenedor: $id("lista-jugadores"),
    tipo: "jugadores",
    etiqueta: "jugador",
    selector: ".btn-editar-jugador",
    funcion: mostrarModalEditarJugador,
  });

  // Mostrar jugadores registrados
  renderizarJugadores();

  // Manejar evento eliminar jugadores
  manejarEventoEliminarJugadores();
};
