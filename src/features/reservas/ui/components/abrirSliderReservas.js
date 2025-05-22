import { $id } from "../../../../shared/ui/index.js";

// Muestra el slider de reservas (animación con delay)
export const abrirSliderReserva = () => {
  const slider = $id("slider-reserva");
  slider.classList.remove("oculto");
  setTimeout(() => slider.classList.add("abierto"), 10);
};

// Oculta el slider de reservas (espera a que termine la animación)
export const cerrarSliderReserva = () => {
  const slider = $id("slider-reserva");
  slider.classList.remove("abierto");
  setTimeout(() => slider.classList.add("oculto"), 300);
};

// Asocia el evento de apertura al botón de reservas
export const iniciarSliderReserva = () => {
  const boton = $id("btn-reservas");
  if (!boton) return;

  boton.addEventListener("click", abrirSliderReserva);
};
