import { obtenerDeLocalStorage } from "../../../data/storage.js";
import {
  crearBadge,
  manejarEventoEliminar,
  crearElementoConClase,
  crearIcono,
  crearParrafoConIcono,
  crearMensajeVacio,
  crearBotonInteractivo,
  $id,
  limpiarContenedor,
  limpiarElemento,
  renderizarLista,
} from "../../../shared/ui/index.js";
import { mostrarJugadoresParaSeleccionar } from "../../reservas/ui/mostrarJugadores.js";
import { hayElementos } from "../../../shared/helpers/listas.js";

const contenedorID = "lista-jugadores";

const crearContenidoJugador = (jugador) => {
  const cardBody = crearElementoConClase("div", "card-body");

  const infoJugador = crearElementoConClase("div", "info-jugador");
  const headerJugador = crearElementoConClase("div", "header-jugador");

  const iconoCard = crearIcono("fa-solid fa-user icono-card");

  const nombreJugador = crearElementoConClase("h3", "nombre-jugador");
  nombreJugador.append(`${jugador.nombre} ${jugador.apellido}`);

  const badge = crearBadge({ texto: "Activo", clase: "badge-activo" });
  nombreJugador.appendChild(badge);

  headerJugador.appendChild(iconoCard);
  headerJugador.appendChild(nombreJugador);
  infoJugador.appendChild(headerJugador);

  const datoIconoEmail = crearParrafoConIcono(
    "fa-solid fa-envelope",
    jugador.email
  );
  const datoIconoTelefono = crearParrafoConIcono(
    "fa-solid fa-phone",
    jugador.telefono
  );

  infoJugador.appendChild(datoIconoEmail);
  infoJugador.appendChild(datoIconoTelefono);

  const accionesJugador = crearElementoConClase("div", "acciones-jugador");

  const botonEditar = crearBotonInteractivo({
    clase: "boton-secundario",
    clasesExtra: ["btn-editar-jugador"],
    texto: "Editar",
    dataset: { id: jugador.id },
    icono: "fa-solid fa-pen",
  });

  const botonEliminar = crearBotonInteractivo({
    clase: "boton-principal",
    clasesExtra: ["btn-eliminar"],
    texto: "Eliminar",
    dataset: { id: jugador.id },
    icono: "fa-solid fa-trash",
  });

  accionesJugador.appendChild(botonEditar);
  accionesJugador.appendChild(botonEliminar);
  cardBody.appendChild(infoJugador);
  cardBody.appendChild(accionesJugador);

  return cardBody; // Retorna el cardBody que contiene toda la información del jugador
};

// Función para crear una tarjeta de jugador
export const crearCardJugador = (jugador) => {
  const div = document.createElement("div");
  div.classList.add("jugador");
  div.dataset.id = jugador.id; // Agregar el ID al div para poder identificarlo

  div.appendChild(crearContenidoJugador(jugador));

  return div;
};

/*
Renderiza la lista de jugadores en el DOM.
Muestra cards o un mensaje vacío si no hay jugadores.
*/
export const mostrarJugadoresRegistrados = () => {
  const jugadoresRegistrados = obtenerDeLocalStorage("jugadores");
  const contenedor = $id(contenedorID);

  renderizarLista(jugadoresRegistrados, contenedor, crearCardJugador);
};

// Función para manejar el evento de eliminar jugadores
export const manejarEventoEliminarJugadores = () => {
  const contenedorJugadores = $id(contenedorID);
  manejarEventoEliminar(
    contenedorJugadores, // Pasar el contenedor de jugadores
    "jugadores", // Tipo de registro
    "jugador", // Etiqueta para Swal
    () => {
      renderizarJugadores(); // Función para renderizar la lista de jugadores
    }
  );
};

export const renderizarJugadores = () => {
  limpiarContenedor("lista-jugadores");
  mostrarJugadoresRegistrados();
  mostrarJugadoresParaSeleccionar();
};
