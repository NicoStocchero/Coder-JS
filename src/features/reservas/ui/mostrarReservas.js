import {
  crearElementoConClase,
  crearBotonInteractivo,
  crearMensajeVacio,
  $id,
  limpiarElemento,
  manejarEventoEliminar,
  renderizarLista,
} from "../../../shared/ui/index.js";
import { obtenerDeLocalStorage } from "../../../data/storage.js";
import { hayElementos } from "../../../shared/helpers/listas.js";

const contenedorID = "lista-reservas";

const crearContenidoReserva = (reserva) => {
  const cardBody = crearElementoConClase("div", "card-body");

  const infoReserva = crearElementoConClase("div", "info-reserva");

  const jugador = crearElementoConClase("p");
  jugador.innerHTML = `<b>Jugador:</b> ${reserva.nombre}`;

  const fecha = crearElementoConClase("p");
  fecha.innerHTML = `<b>Fecha:</b> ${reserva.fecha}`;

  const hora = crearElementoConClase("p");
  hora.innerHTML = `<b>Hora:</b> ${reserva.hora} - ${reserva.horaFin}`;

  const cancha = crearElementoConClase("p");
  cancha.innerHTML = `<b>Cancha:</b> ${reserva.cancha}`;

  infoReserva.append(jugador, fecha, hora, cancha);

  const accionesReserva = crearElementoConClase("div", "acciones-reserva");

  const botonEditar = crearBotonInteractivo({
    clase: "boton-secundario",
    clasesExtra: ["btn-editar-reserva"],
    texto: "Editar",
    dataset: { id: reserva.id },
    icono: "fa-solid fa-pen",
  });

  const botonEliminar = crearBotonInteractivo({
    clase: "boton-principal",
    clasesExtra: ["btn-eliminar"],
    texto: "Eliminar",
    dataset: { id: reserva.id },
    icono: "fa-solid fa-trash",
  });

  accionesReserva.append(botonEditar, botonEliminar);
  cardBody.append(infoReserva, accionesReserva);

  return cardBody;
};

export const crearCardReserva = (reserva) => {
  const div = document.createElement("div");
  div.classList.add("reserva");
  div.dataset.id = reserva.id;
  div.appendChild(crearContenidoReserva(reserva));
  return div;
};

export const mostrarReservasRegistradas = () => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  const contenedor = $id(contenedorID);

  renderizarLista(reservas, contenedor, crearCardReserva);
};

export const manejarEventoEliminarReservas = () => {
  const contenedorReservas = $id(contenedorID);
  manejarEventoEliminar(contenedorReservas, "reservas", "reserva", () => {
    mostrarReservasRegistradas();
  });
};
