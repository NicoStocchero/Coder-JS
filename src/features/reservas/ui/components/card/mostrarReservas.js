import {
  crearElementoConClase,
  crearBotonInteractivo,
  $id,
  manejarEventoEliminar,
  renderizarLista,
  crearIcono,
} from "../../../../../shared/ui/index.js";
import { obtenerDeLocalStorage } from "../../../../../data/storage.js";

const contenedorID = "lista-reservas";

// Crea el contenido interno de la tarjeta de reserva
const crearContenidoReserva = (reserva) => {
  const cardBody = crearElementoConClase("div", "card-body");

  const cabecera = crearElementoConClase("div", "cabecera-reserva");

  const fecha = crearElementoConClase("div", "cabecera-fecha");
  fecha.textContent = dayjs(reserva.fecha).format("D [de] MMM");

  const lineaInferior = crearElementoConClase("div", "cabecera-inferior");

  const cancha = crearElementoConClase("span", "dato-cancha");
  cancha.textContent = reserva.cancha;

  const horario = crearElementoConClase("span", "dato-horario");
  horario.textContent = `${reserva.hora} - ${reserva.horaFin}`;

  lineaInferior.append(cancha, horario);
  cabecera.append(fecha, lineaInferior);

  const headerJugador = crearElementoConClase("div", "header-jugador");
  const iconoCard = crearIcono("fa-solid fa-user icono-card");
  const jugador = crearElementoConClase("p", "jugador-reserva");
  jugador.textContent = reserva.nombre;

  headerJugador.appendChild(iconoCard);
  headerJugador.appendChild(jugador);

  const separador = crearElementoConClase("div", "linea-separadora");

  const accionesReserva = crearElementoConClase("div", "acciones-reserva");

  // Botón para editar la reserva
  const botonEditar = crearBotonInteractivo({
    clase: "boton-secundario",
    clasesExtra: ["btn-editar-reserva", "boton--chico"],
    texto: "Editar",
    dataset: { id: reserva.id },
    icono: "fa-solid fa-pen",
  });

  // Botón para eliminar la reserva
  const botonEliminar = crearBotonInteractivo({
    clase: "boton-principal",
    clasesExtra: ["btn-eliminar", "boton--chico"],
    texto: "Eliminar",
    dataset: { id: reserva.id },
    icono: "fa-solid fa-trash",
  });

  accionesReserva.append(botonEditar, botonEliminar);
  cardBody.append(cabecera, headerJugador, separador, accionesReserva);

  return cardBody;
};

// Crea la tarjeta completa con atributos dataset para edición
export const crearCardReserva = (reserva) => {
  const div = document.createElement("div");
  div.classList.add("reserva");
  div.dataset.id = reserva.id;
  div.dataset.fecha = reserva.fecha;
  div.dataset.hora = reserva.hora;
  div.dataset.cancha = reserva.cancha;
  div.dataset.duracion = reserva.duracion;
  div.dataset.jugador = reserva.jugador;
  div.appendChild(crearContenidoReserva(reserva));
  return div;
};

// Muestra todas las reservas guardadas en el contenedor
export const mostrarReservasRegistradas = () => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  const contenedor = $id(contenedorID);
  renderizarLista(reservas, contenedor, crearCardReserva);
};

// Asocia el evento de eliminación para las tarjetas de reservas
export const manejarEventoEliminarReservas = () => {
  const contenedorReservas = $id(contenedorID);
  manejarEventoEliminar(contenedorReservas, "reservas", "reserva", () => {
    mostrarReservasRegistradas(); // Refresca la lista luego de eliminar
  });
};
