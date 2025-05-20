import {
  normalizarNombrePropio,
  normalizarEmail,
  normalizarTelefono,
  validarCampoTexto,
  validarEmail,
  validarTelefono,
  compruebaErrores,
} from "../../../shared/validators/index.js";

export const procesarJugador = (datos) => {
  const datosNormalizados = {
    nombre: normalizarNombrePropio(datos.nombre),
    apellido: normalizarNombrePropio(datos.apellido),
    email: normalizarEmail(datos.email),
    telefono: normalizarTelefono(datos.telefono),
  };

  const errores = {
    nombre: validarCampoTexto(datosNormalizados.nombre),
    apellido: validarCampoTexto(datosNormalizados.apellido),
    email: validarEmail(datosNormalizados.email),
    telefono: validarTelefono(datosNormalizados.telefono),
  };

  const valido = !compruebaErrores(errores);

  return {
    datos: datosNormalizados,
    errores,
    valido,
  };
};
