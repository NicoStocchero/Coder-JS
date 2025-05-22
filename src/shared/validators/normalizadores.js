// Elimina espacios duplicados y recorta espacios al inicio/final
export const normalizarTexto = (texto) => texto.trim().replace(/\s+/g, " ");

// Convierte a formato Nombre Propio (con mayúscula inicial)
export const normalizarNombrePropio = (texto) => {
  const textoLimpio = normalizarTexto(texto);
  return textoLimpio
    .toLowerCase()
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
};

// Convierte un email a minúsculas y sin espacios
export const normalizarEmail = (email) => email.trim().toLowerCase();

// Elimina todos los caracteres que no sean dígitos
export const normalizarTelefono = (telefono) => telefono.replace(/\D/g, "");
