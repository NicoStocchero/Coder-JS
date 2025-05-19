// Importaciones de formulario de Jugador
import { formularioNuevoJugador } from "./formJugadores.js"; // Importa el formulario de jugadores
import {
  mostrarJugadoresRegistrados,
  manejarEventoEliminarJugadores,
} from "./ui/cargarJugadores.js"; // Importa la función para mostrar jugadores registrados

export const initJugadores = () => {
  // Ejecutar formulario de jugadores
  formularioNuevoJugador();

  // Mostrar jugadores registrados
  mostrarJugadoresRegistrados();

  // Manejar evento eliminar jugadores
  manejarEventoEliminarJugadores();
};
