import { $id } from "../../../shared/ui/index.js";

export const abrirSliderReserva = () => {
  const slider = $id("slider-reserva");
  slider.classList.remove("oculto");
  setTimeout(() => slider.classList.add("abierto"), 10);
};

export const cerrarSliderReserva = () => {
  const slider = $id("slider-reserva");
  slider.classList.remove("abierto");
  setTimeout(() => slider.classList.add("oculto"), 300);
};

export const iniciarSliderReserva = () => {
  const boton = $id("btn-reservas");

  if (!boton) return;

  boton.addEventListener("click", abrirSliderReserva);
};
