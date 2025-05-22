import {
  normalizarTexto,
  normalizarEmail,
  normalizarTelefono,
} from "./normalizadores.js";

// Valida campos de texto (nombre, apellido, etc.)
export const validarCampoTexto = (texto) => {
  const textoLimpio = normalizarTexto(texto);

  if (validator.isEmpty(textoLimpio)) {
    return "El campo no puede estar vacío";
  }
  if (!validator.isAlpha(textoLimpio, "es-ES", { ignore: " " })) {
    return "El campo solo puede contener letras y espacios";
  }
  if (textoLimpio.length < 3 || textoLimpio.length > 100) {
    return "El campo debe tener entre 3 y 100 caracteres";
  }

  return "";
};

// Valida campos de email
export const validarEmail = (email) => {
  const emailLimpio = normalizarEmail(email);

  if (validator.isEmpty(emailLimpio)) {
    return "El email no puede estar vacío";
  }
  if (!validator.isEmail(emailLimpio)) {
    return "El email debe ser un email válido";
  }
  if (emailLimpio.length > 100) {
    return "El email no puede tener más de 100 caracteres";
  }

  return "";
};

// Valida teléfonos de 10 dígitos numéricos
export const validarTelefono = (telefono) => {
  const telefonoLimpio = normalizarTelefono(telefono);

  if (!/^\d{10}$/.test(telefonoLimpio)) {
    return "El teléfono debe contener exactamente 10 dígitos numéricos";
  }

  return "";
};
