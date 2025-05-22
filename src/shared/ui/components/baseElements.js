import { limpiarElemento } from "../helpers/dom.js";
import { hayElementos } from "../../helpers/listas.js";
import { crearMensajeVacio } from "./messages.js";

// Crea un elemento HTML con una o más clases
export const crearElementoConClase = (tag, clases = "") => {
  const elemento = document.createElement(tag);
  if (clases) {
    clases.split(" ").forEach((c) => elemento.classList.add(c));
  }
  return elemento;
};

// Crea un elemento HTML con texto y clases
export const crearElementoConTexto = (tag, texto, clases = "") => {
  const elemento = crearElementoConClase(tag, clases);
  elemento.textContent = texto;
  return elemento;
};

// Renderiza una lista de elementos en un contenedor
// Si no hay elementos, muestra un mensaje vacío por defecto
export const renderizarLista = (items, contenedor, crearElemento) => {
  limpiarElemento(contenedor);

  if (hayElementos(items)) {
    items.forEach((item) => contenedor.appendChild(crearElemento(item)));
  } else {
    contenedor.appendChild(crearMensajeVacio("No hay elementos registrados"));
  }
};
