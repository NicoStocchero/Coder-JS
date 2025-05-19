// Funciones para normalizar campos
export const normalizarTexto = (texto) => {
  return texto.trim().replace(/\s+/g, " ");
}; // Elimina espacios en blanco al principio y al final, y reemplaza múltiples espacios por uno solo

export const normalizarNombrePropio = (texto) => {
  const textoLimpio = normalizarTexto(texto);
  return textoLimpio
    .toLowerCase()
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}; // Convierte la primera letra de cada palabra a mayúscula y el resto a minúscula

export const normalizarEmail = (email) => {
  return email.trim().toLowerCase();
};

export const normalizarTelefono = (telefono) => {
  return telefono.replace(/\D/g, "");
}; // Elimina todos los caracteres que no sean dígitos

// Funciones de validación
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
}; // Valida que el campo no esté vacío, contenga solo letras y espacios, y tenga entre 3 y 100 caracteres

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
}; // Valida que el email no esté vacío, sea un email válido y no tenga más de 100 caracteres

export const validarTelefono = (telefono) => {
  const telefonoLimpio = normalizarTelefono(telefono);

  if (!/^\d{10}$/.test(telefonoLimpio)) {
    return "El teléfono debe contener exactamente 10 dígitos numéricos";
  }
  return "";
}; // Valida que el teléfono contenga exactamente 10 dígitos numéricos

// Manejo de errores
export const compruebaErrores = (errores) => {
  for (const campo in errores) {
    if (errores[campo] !== "") {
      return true;
    } // Devuelve true si alguno de los campos tiene un error
  }
  return false;
};

// Verifica si hay elementos en una lista
export const hayElementos = (lista) => Array.isArray(lista) && lista.length > 0;
