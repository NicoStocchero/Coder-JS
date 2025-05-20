import { validarCampoTexto, validarEmail, validarTelefono } from "../index.js";

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
