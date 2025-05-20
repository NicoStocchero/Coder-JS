export const crearIcono = (clases) => {
  const icono = document.createElement("i");
  icono.className = clases;
  icono.setAttribute("aria-hidden", "true");
  return icono;
};
