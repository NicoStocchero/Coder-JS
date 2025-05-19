import { obtenerDeLocalStorage } from "../../../data/storage.js";
import { manejarEventoEliminar } from "../../../shared/ui/botonEliminar.js";
import { mostrarJugadoresParaSeleccionar } from "../../reservas/ui/mostrarJugadores.js";
import { $id, limpiarContenedor } from "../../../shared/ui/dom.js";
import { hayElementos } from "../../../helpers/validation/validaciones.js";

const contenedorID = "lista-jugadores";
const mensajeVacio = `<p class="mensaje-vacio" aria-live="polite">No hay jugadores registrados.</p>`;

// Genera el mensaje HTML para cada jugador
const generarHTMLJugador = (jugador) => {
  return `
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
    </div>`;
};

// Función para crear una tarjeta de jugador
export const crearCardJugador = (jugador) => {
  const div = document.createElement("div");
  div.classList.add("jugador");
  div.dataset.id = jugador.id; // Agregar el ID al div para poder identificarlo

  div.innerHTML = generarHTMLJugador(jugador);

  return div;
};

/*
Renderiza la lista de jugadores en el DOM.
Muestra cards o un mensaje vacío si no hay jugadores.
*/
export const mostrarJugadoresRegistrados = () => {
  const jugadoresRegistrados = obtenerDeLocalStorage("jugadores");
  const contenedor = $id(contenedorID);
  limpiarContenedor(contenedor);

  if (hayElementos(jugadoresRegistrados)) {
    jugadoresRegistrados.forEach((jugador) => {
      contenedor.appendChild(crearCardJugador(jugador)); // Crear y agregar cada tarjeta de jugador al contenedor
    });
  } else {
    contenedor.innerHTML = mensajeVacio;
  }
};

// Función para manejar el evento de eliminar jugadores
export const manejarEventoEliminarJugadores = () => {
  const contenedorJugadores = $id(contenedorID);
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
