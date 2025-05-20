// Se utilizan $id, $qs y $qsa para seleccionar elementos del DOM de una manera más sencilla y fácil de implementar.
export const $id = (id) => document.getElementById(id);
export const $qs = (sel) => document.querySelector(sel);
export const $qsa = (sel) => document.querySelectorAll(sel);

export const getValue = (id) => {
  const elemento = $id(id);
  return elemento ? elemento.value.trim() : "";
};

export const setValue = (id, valor) => {
  const elemento = $id(id);
  if (elemento) elemento.value = valor;
};

export const addClass = (id, clase) => $id(id)?.classList.add(clase);
export const removeClass = (id, clase) => $id(id)?.classList.remove(clase);
export const toggleClass = (id, clase) => $id(id)?.classList.toggle(clase);

export const limpiarElemento = (elemento) => {
  if (elemento) elemento.innerHTML = "";
};

export const limpiarInput = (id) => {
  const input = $id(id);
  if (input) input.value = "";
};

export const limpiarContenedor = (id) => {
  const contenedor = $id(id);
  if (!(contenedor instanceof HTMLElement)) {
    throw new Error(`El elemento con ID ${id} no es un contenedor válido.`);
  }

  contenedor.innerHTML = "";
};
