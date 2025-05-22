// Crea un mensaje <p> con clase, texto y atributo aria-live
const crearMensaje = (texto, clase, ariaLive) => {
  const p = document.createElement("p");
  p.className = clase;
  p.setAttribute("aria-live", ariaLive);
  p.textContent = texto;
  return p;
};

// Mensaje vacío para listas sin datos
export const crearMensajeVacio = (texto, clase = "mensaje-vacio") =>
  crearMensaje(texto, clase, "polite");

// Mensaje de error con prioridad alta
export const crearMensajeError = (texto, clase = "mensaje-error") =>
  crearMensaje(texto, clase, "assertive");

// Mensaje de éxito con prioridad alta
export const crearMensajeExito = (texto, clase = "mensaje-exito") =>
  crearMensaje(texto, clase, "assertive");
