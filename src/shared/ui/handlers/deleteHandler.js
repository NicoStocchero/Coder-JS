import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../../data/storage.js";
import { notificarConfirmacion, notificarExito } from "./notificaciones.js";

// Elimina un registro del localStorage y del DOM si el usuario lo confirma
const eliminarRegistro = async (id, tipo, etiqueta, contenedor, funcion) => {
  const registros = obtenerDeLocalStorage(tipo);
  const nuevoRegistro = registros.filter((item) => item.id !== id); // Excluye el registro a eliminar

  const confirmado = await notificarConfirmacion({
    titulo: "¿Estás seguro?",
    mensaje: `¿Quieres eliminar el ${etiqueta}?`,
  });

  if (confirmado) {
    guardarEnLocalStorage(tipo, nuevoRegistro);

    const elementoAEliminar = contenedor.querySelector(`[data-id="${id}"]`);
    if (elementoAEliminar) {
      contenedor.removeChild(elementoAEliminar); // Lo elimina visualmente del DOM
    }

    notificarExito({
      titulo: "Eliminado",
      mensaje: `${etiqueta} se ha eliminado con éxito`,
    });

    if (typeof funcion === "function") {
      funcion(); // Ejecuta función extra si fue pasada (ej: volver a renderizar)
    }
  }
};

// Escucha clics en el contenedor y llama a eliminarRegistro si se clickea un botón de eliminar
export const manejarEventoEliminar = (contenedor, tipo, etiqueta, funcion) => {
  contenedor.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest(".btn-eliminar");
    if (botonEliminar) {
      const id = botonEliminar.dataset.id;
      eliminarRegistro(id, tipo, etiqueta, contenedor, funcion);
    }
  });
};
