// Crea un ícono <i> con clases personalizadas y oculto para lectores de pantalla
export const crearIcono = (clases) => {
  const icono = document.createElement("i");
  icono.className = clases;
  icono.setAttribute("aria-hidden", "true");
  return icono;
};
