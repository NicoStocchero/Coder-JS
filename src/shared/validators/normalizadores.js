export const normalizarTexto = (texto) => texto.trim().replace(/\s+/g, " ");

export const normalizarNombrePropio = (texto) => {
  const textoLimpio = normalizarTexto(texto);
  return textoLimpio
    .toLowerCase()
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
};

export const normalizarEmail = (email) => email.trim().toLowerCase();

export const normalizarTelefono = (telefono) => telefono.replace(/\D/g, "");
