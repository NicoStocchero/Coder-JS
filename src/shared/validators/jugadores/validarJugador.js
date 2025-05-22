import { validarCampoTexto, validarEmail, validarTelefono } from "../index.js";

// Valida los campos del formulario de jugador
// Devuelve un objeto con:
// - valido: true si no hay errores
// - errores: mensajes de error por campo
export const validarJugador = ({ nombre, apellido, email, telefono }) => {
  const errores = {
    nombre: validarCampoTexto(nombre),
    apellido: validarCampoTexto(apellido),
    email: validarEmail(email),
    telefono: validarTelefono(telefono),
  };

  const valido = Object.values(errores).every((error) => error === "");

  return {
    valido,
    errores,
  };
};
