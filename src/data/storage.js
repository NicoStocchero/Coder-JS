import { mostrarJugadoresParaSeleccionar } from "../features/reservas/ui/mostrarJugadores.js";

export const guardarEnLocalStorage = (clave, valor) => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo guardar la información en el almacenamiento local.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};

export const obtenerDeLocalStorage = (clave) => {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo obtener la información del almacenamiento local.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return null;
  }
};

export const eliminarDeLocalStorage = (clave) => {
  try {
    localStorage.removeItem(clave);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar la información del almacenamiento local.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};
