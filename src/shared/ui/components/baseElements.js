export const crearElementoConClase = (tag, clases = "") => {
  const elemento = document.createElement(tag);
  if (clases) {
    clases.split(" ").forEach((c) => elemento.classList.add(c));
  }
  return elemento;
};

export const crearElementoConTexto = (tag, texto, clases = "") => {
  const elemento = crearElementoConClase(tag, clases);
  elemento.textContent = texto;
  return elemento;
};
