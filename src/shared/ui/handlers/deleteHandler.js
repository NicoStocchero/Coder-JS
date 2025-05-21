import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../../data/storage.js";
import { notificarConfirmacion, notificarExito } from "./notificaciones.js";

const eliminarRegistro = async (id, tipo, etiqueta, contenedor, funcion) => {
  const registros = obtenerDeLocalStorage(tipo);
  const nuevoRegistro = registros.filter((item) => item.id !== id); // Filtra todos los registros, excluyendo el que se va a eliminar y lo guarda en una nueva variable

  const confirmado = await notificarConfirmacion({
    titulo: "¿Estás seguro?",
    mensaje: `¿Quieres eliminar el ${etiqueta}?`,
  });
  if (confirmado) {
    guardarEnLocalStorage(tipo, nuevoRegistro);

    const elementoAEliminar = contenedor.querySelector(`[data-id="${id}"]`); // Encuentra el elemento a eliminar en el contenedor usando el id

    if (elementoAEliminar) {
      contenedor.removeChild(elementoAEliminar);
    }
    notificarExito({
      titulo: "Eliminado",
      mensaje: `${etiqueta} se ha eliminado con éxito`,
    });
    if (typeof funcion === "function") {
      // Se ejecuta solo si es una función. Evita errores si no se pasa una función
      funcion();
    }
  }
};

export const manejarEventoEliminar = (contenedor, tipo, etiqueta, funcion) => {
  // Recibe el contenedor donde se encuentran los botones, el tipo de registro (jugador, equipo, etc), la etiqueta que se va a mostrar en la alerta y una función opcional para ejecutar después de eliminar
  contenedor.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest(".btn-eliminar"); // Detecta si se hizo click en un botón de eliminar

    if (botonEliminar) {
      const id = botonEliminar.dataset.id; // Obtiene el id del registro a eliminar desde el atributo data-id del botón

      eliminarRegistro(id, tipo, etiqueta, contenedor, funcion);
    }
  });
};
