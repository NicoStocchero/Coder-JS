import { limpiarElemento } from "../helpers/dom.js";
import { hayElementos } from "../../helpers/listas.js";
import { crearMensajeVacio } from "./messages.js";

export const crearElementoConClase = (tag, clases = "") => {
  const elemento = document.createElement(tag);
  if (clases) {
    clases.split(" ").forEach((c) => elemento.classList.add(c));
  }
  return elemento;
};

export const crearElementoConTexto = (tag, texto, clases = "") => {
  const elemento = crearElementoConClase(tag, clases);
  elemento.textContent = texto;
  return elemento;
};

export const renderizarLista = (items, contenedor, crearElemento) => {
  limpiarElemento(contenedor);
  if (hayElementos(items)) {
    items.forEach((item) => contenedor.appendChild(crearElemento(item)));
  } else {
    contenedor.appendChild(crearMensajeVacio("No hay elementos registrados"));
  }
};
