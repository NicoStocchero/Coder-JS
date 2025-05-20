import { confirmarReserva } from "../logic/confirmarReserva.js";
import { $id } from "../../../shared/ui/index.js";

export const formularioNuevaReserva = () => {
  const formulario = $id("formulario-reserva");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    confirmarReserva();
  });
};
