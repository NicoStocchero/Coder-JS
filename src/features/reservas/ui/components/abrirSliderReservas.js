import { $id } from "../../../../shared/ui/index.js";

/**
 * Muestra el panel deslizante de reservas.
 * Usa requestAnimationFrame para disparar la transición CSS correctamente.
 */
export const abrirSliderReserva = () => {
  const slider = $id("slider-reserva");
  if (!slider) return;

  slider.classList.remove("oculto");

  // Espera al próximo frame para permitir el repaint y activar la animación
  requestAnimationFrame(() => {
    slider.classList.add("abierto");
  });
};

/**
 * Oculta el slider de reservas.
 * Espera el tiempo de animación antes de aplicar display: none.
 */
export const cerrarSliderReserva = () => {
  const slider = $id("slider-reserva");
  if (!slider) return;

  slider.classList.remove("abierto");

  // Después de la animación CSS, oculta completamente el panel
  setTimeout(() => {
    slider.classList.add("oculto");
  }, 300); // Este valor debe coincidir con el transition-duration del CSS
};

/**
 * Asocia los botones de apertura y cierre del slider.
 * Se llama una única vez en init.
 */
export const iniciarSliderReserva = () => {
  const botonAbrir = $id("btn-reservas");
  if (botonAbrir) {
    botonAbrir.addEventListener("click", abrirSliderReserva);
  }

  const botonCerrar = $id("btn-cerrar-slider");
  if (botonCerrar) {
    botonCerrar.addEventListener("click", cerrarSliderReserva);
  }
};
