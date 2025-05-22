import { crearIcono } from "./icons.js";

// Crea un párrafo con un ícono y texto al lado, usando clase "dato-icono"
export const crearParrafoConIcono = (iconoClases, texto) => {
  const p = document.createElement("p");
  p.classList.add("dato-icono");

  const icono = crearIcono(iconoClases);
  const span = document.createElement("span");
  span.textContent = texto;

  p.appendChild(icono);
  p.appendChild(span);
  return p;
};
