import {
  obtenerDeLocalStorage,
  guardarEnLocalStorage,
} from "../../../data/storage.js";
import { notificarError } from "../../../shared/ui/index.js";

// Aplicación de los métodos de almacenamiento local
export const agregarJugadorEnLocalStorage = (jugador) => {
  const jugadores = obtenerDeLocalStorage("jugadores") || [];

  // Comprobar si el email o el teléfono del jugador ya está registrado
  // Si ya existe, mostrar un mensaje de error y no agregar el jugador
  if (jugadores.some((j) => j.email === jugador.email)) {
    notificarError({
      mensaje: "Ya existe un jugador con ese email.",
    });
    return;
  } else if (jugadores.some((j) => j.telefono === jugador.telefono)) {
    notificarError({
      mensaje: "Ya existe un jugador con ese teléfono.",
    });
    return;
  }

  jugador.id = crypto.randomUUID(); // Generar un ID único para el jugador
  jugadores.push(jugador);
  guardarEnLocalStorage("jugadores", jugadores);
  return true;
};

// Función para eliminar un jugador del almacenamiento local
// Esta función recibe el id del jugador a eliminar y lo elimina de la lista de jugadores
export const eliminarJugadorDeLocalStorage = (id) => {
  const jugadores = obtenerDeLocalStorage("jugadores") || [];
  try {
    const jugadoresActualizados = jugadores.filter(
      (jugador) => jugador.id !== id
    );
    guardarEnLocalStorage("jugadores", jugadoresActualizados);
    return jugadores.length !== jugadoresActualizados.length;
  } catch (error) {
    notificarError({
      mensaje: "Error al eliminar el jugador. Intente nuevamente.",
    });
  }
};
