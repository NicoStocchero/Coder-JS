import { notificarError } from "../shared/ui/handlers/notificaciones.js";

export const guardarEnLocalStorage = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    notificarError({
      mensaje: "No se pudo guardar la información en el almacenamiento local.",
      error,
    });
  }
};

export const obtenerDeLocalStorage = (clave) => {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  } catch (error) {
    notificarError({
      mensaje: "No se pudo obtener la información del almacenamiento local.",
      error,
    });
  }
};

export const eliminarDeLocalStorage = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch (error) {
    notificarError({
      mensaje: "No se pudo eliminar la información del almacenamiento local.",
      error,
    });
  }
};
