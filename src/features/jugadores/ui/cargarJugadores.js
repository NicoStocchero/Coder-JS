import { obtenerDeLocalStorage } from "../../../data/storage.js";
import { manejarEventoEliminar } from "../../../helpers/botonEliminar.js";
import { mostrarJugadoresParaSeleccionar } from "../../reservas/ui/mostrarJugadores.js";

const contenedorID = "lista-jugadores";

export const crearCardJugador = (jugador) => {
  const div = document.createElement("div");
  div.classList.add("jugador");
  div.dataset.id = jugador.id; // Agregar el ID al div para poder identificarlo
  div.innerHTML = `
        <div class="card-body">
      <div class="info-jugador">
        <div class="header-jugador">
          <i class="fa-solid fa-user icono-card"></i>
          <h3 class="nombre-jugador">
            ${jugador.nombre} ${jugador.apellido}
            <span class="badge badge-activo">Activo</span>
          </h3>
        </div>
        <p class="dato-icono">
          <i class="fa-solid fa-envelope"></i>
          <span>${jugador.email}</span>
        </p>
        <p class="dato-icono">
          <i class="fa-solid fa-phone"></i>
          <span>${jugador.telefono}</span>
        </p>
      </div>
      <div class="acciones-jugador">
        <button class="boton-secundario btn-editar-jugador" data-id="${jugador.id}">
          <i class="fa-solid fa-pen"></i> Editar
        </button>
        <button class="boton-principal btn-eliminar" data-id="${jugador.id}">
          <i class="fa-solid fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
    `; // Insertar la tarjeta del jugador con su información y botones de acción
  return div;
};

// Función para mostrar los jugadores registrados en el contenedor correspondiente
export const mostrarJugadoresRegistrados = () => {
  const jugadoresRegistrados = obtenerDeLocalStorage("jugadores");
  const contenedor = document.getElementById(contenedorID);
  contenedor.innerHTML = ""; // Limpiar contenido previo

  if (jugadoresRegistrados && jugadoresRegistrados.length > 0) {
    jugadoresRegistrados.forEach((jugador) => {
      contenedor.appendChild(crearCardJugador(jugador)); // Crear y agregar cada tarjeta de jugador al contenedor
    });
  } else {
    contenedor.innerHTML = "<p>No hay jugadores registrados.</p>"; // Si no hay jugadores, se muestra un mensaje indicando que no hay registros
  }
};

// Función para manejar el evento de eliminar jugadores
export const manejarEventoEliminarJugadores = () => {
  const contenedorJugadores = document.getElementById(contenedorID);
  manejarEventoEliminar(
    contenedorJugadores, // Pasar el contenedor de jugadores
    "jugadores", // Tipo de registro
    "jugador", // Etiqueta para Swal
    () => {
      mostrarJugadoresRegistrados();
      mostrarJugadoresParaSeleccionar();
    }
  );
};
