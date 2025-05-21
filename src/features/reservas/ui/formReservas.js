import { confirmarReserva } from "../logic/confirmarReserva.js";
import { $id } from "../../../shared/ui/index.js";
import { cerrarSliderReserva } from "./abrirSliderReservas.js";

let modoEdicion = false;
let idReservaEditando = null;

export const formularioNuevaReserva = () => {
  const formulario = $id("formulario-reserva");
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fueConfirmada = await confirmarReserva({
      modoEdicion,
      idAnterior: idReservaEditando,
    });
    if (fueConfirmada) {
      cerrarSliderReserva();
    }
  });
};
