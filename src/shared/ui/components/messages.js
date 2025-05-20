const crearMensaje = (texto, clase, ariaLive) => {
  const p = document.createElement("p");
  p.className = clase;
  p.setAttribute("aria-live", ariaLive);
  p.textContent = texto;
  return p;
};

export const crearMensajeVacio = (texto, clase = "mensaje-vacio") =>
  crearMensaje(texto, clase, "polite");

export const crearMensajeError = (texto, clase = "mensaje-error") =>
  crearMensaje(texto, clase, "assertive");

export const crearMensajeExito = (texto, clase = "mensaje-exito") =>
  crearMensaje(texto, clase, "assertive");
