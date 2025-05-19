import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../data/storage.js";

const eliminarRegistro = (id, tipo, etiqueta, contenedor, funcion) => {
  const registros = obtenerDeLocalStorage(tipo);
  const nuevoRegistro = registros.filter((item) => item.id !== id); // Filtra todos los registros, excluyendo el que se va a eliminar y lo guarda en una nueva variable

  Swal.fire({
    title: "¿Estás seguro?",
    text: `¿Quieres eliminar el ${etiqueta}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      guardarEnLocalStorage(tipo, nuevoRegistro);

      const elementoAEliminar = contenedor.querySelector(`[data-id="${id}"]`); // Encuentra el elemento a eliminar en el contenedor usando el id

      if (elementoAEliminar) {
        contenedor.removeChild(elementoAEliminar);
      }
      Swal.fire({
        title: "Eliminado",
        text: `${etiqueta} eliminado con éxito`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      if (typeof funcion === "function") {
        // Se ejecuta solo si es una función. Evita errores si no se pasa una función
        funcion();
      }
    }
  });
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
