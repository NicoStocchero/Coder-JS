// Selectores rápidos del DOM
export const $id = (id) => document.getElementById(id);
export const $qs = (sel) => document.querySelector(sel);
export const $qsa = (sel) => document.querySelectorAll(sel);

// Devuelve el valor o texto de un elemento (según el tipo)
export const getValue = (id) => {
  const elemento = $id(id);
  if (!elemento) return;

  if ("value" in elemento) {
    return elemento.value.trim();
  } else if ("textContent" in elemento) {
    return elemento.textContent.trim();
  }
};

// Asigna un valor o texto a un elemento (según el tipo)
export const setValue = (id, valor) => {
  const elemento = $id(id);
  if (!elemento) return;

  if ("value" in elemento) {
    elemento.value = valor;
  } else if ("textContent" in elemento) {
    elemento.textContent = valor;
  } else {
    throw new Error(
      `El elemento con ID ${id} no tiene propiedad 'value' o 'textContent'.`
    );
  }
};

// Helpers para manipular clases
export const addClass = (id, clase) => $id(id)?.classList.add(clase);
export const removeClass = (id, clase) => $id(id)?.classList.remove(clase);
export const toggleClass = (id, clase) => $id(id)?.classList.toggle(clase);

// Limpia el contenido interno de un elemento
export const limpiarElemento = (elemento) => {
  if (elemento) elemento.innerHTML = "";
};

// Limpia el valor de un input
export const limpiarInput = (id) => {
  const input = $id(id);
  if (input) input.value = "";
};

// Limpia un contenedor (verifica que sea un HTMLElement)
export const limpiarContenedor = (id) => {
  const contenedor = $id(id);
  if (!(contenedor instanceof HTMLElement)) {
    throw new Error(`El elemento con ID ${id} no es un contenedor válido.`);
  }

  contenedor.innerHTML = "";
};
