import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../../data/storage.js";
import { notificarError } from "./notificaciones.js";

// Guarda un registro editado si no hay duplicados por email o teléfono
export const guardarRegistroEditado = (tipo, id, registroEditado) => {
  const registros = obtenerDeLocalStorage(tipo) || [];

  const index = registros.findIndex((item) => item.id === id);
  if (index === -1) return false; // No se encontró el registro original

  // Comprueba si es un jugador el objeto a editar
  const esJugador = "email" in registroEditado && "telefono" in registroEditado;

  // Verifica si hay otro registro con mismo email o teléfono
  const repetido = esJugador
    ? registros.some(
        (item) =>
          item.id !== id &&
          (item.email === registroEditado.email ||
            item.telefono === registroEditado.telefono)
      )
    : false;

  if (repetido) {
    notificarError({
      mensaje: "Ya existe un registro con ese email o teléfono.",
    });
    return false;
  }

  // Reemplaza el registro editado en la lista
  const registrosActualizados = registros.map((registro) =>
    registro.id === id ? { ...registro, ...registroEditado } : registro
  );

  guardarEnLocalStorage(tipo, registrosActualizados);
  return true;
};
