import { confirmarReserva } from "../logic/confirmarReserva.js";

export const formularioNuevaReserva = () => {
  const formulario = document.getElementById("formulario-reserva");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    confirmarReserva();
  });
};
