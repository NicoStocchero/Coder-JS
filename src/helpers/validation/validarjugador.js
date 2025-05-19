import {
  validarCampoTexto,
  validarEmail,
  validarTelefono,
  compruebaErrores,
} from "./validaciones.js";

export const validarJugador = (datos) => {
  const { nombre, apellido, email, telefono } = datos;

  const errores = {
    nombre: validarCampoTexto(nombre),
    apellido: validarCampoTexto(apellido),
    email: validarEmail(email),
    telefono: validarTelefono(telefono),
  };

  if (compruebaErrores(errores)) {
    return {
      valido: false,
      errores, // Devuelve un objeto con los errores encontrados
    };
  }
  return {
    valido: true,
  };
};
