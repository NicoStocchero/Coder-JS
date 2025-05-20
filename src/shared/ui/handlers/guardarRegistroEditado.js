import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../../data/storage.js";
import { notificarError } from "./notificaciones.js";

export const guardarRegistroEditado = (tipo, id, registroEditado) => {
  const registros = obtenerDeLocalStorage(tipo) || [];

  const index = registros.findIndex((item) => item.id === id);
  if (index === -1) return false;

  const repetido = registros.some(
    (item) =>
      item.id !== id &&
      (item.email === registroEditado.email ||
        item.telefono === registroEditado.telefono)
  );

  if (repetido) {
    notificarError({
      mensaje: "Ya existe un registro con ese email o teléfono.",
    });
    return false;
  }

  const registrosActualizados = registros.map((registro) =>
    registro.id === id ? { ...registro, ...registroEditado } : registro
  );

  guardarEnLocalStorage(tipo, registrosActualizados);
  return true;
};
