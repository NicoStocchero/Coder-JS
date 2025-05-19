import { obtenerDeLocalStorage } from "../../../data/storage.js";

export const mostrarJugadoresParaSeleccionar = () => {
  const jugadores = obtenerDeLocalStorage("jugadores") || [];

  const select = document.getElementById("jugadores");
  select.innerHTML = ""; // Limpiar el contenido previo del select

  // Crear la opción por defecto
  const opcionDefault = document.createElement("option");
  opcionDefault.value = ""; // Valor vacío para la opción por defecto
  opcionDefault.textContent = "Seleccionar jugador";
  opcionDefault.disabled = true; // Deshabilitar la opción por defecto
  opcionDefault.selected = true; // Marcar la opción por defecto como seleccionada
  select.appendChild(opcionDefault); // Agregar la opción por defecto al select

  for (const jugador of jugadores) {
    const opcion = document.createElement("option");
    opcion.value = jugador.id; // Asignar el ID del jugador como valor de la opción
    opcion.textContent = `${jugador.nombre} ${jugador.apellido}`; // Mostrar el nombre y apellido del jugador
    select.appendChild(opcion);
  }
};
