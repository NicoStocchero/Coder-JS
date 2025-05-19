export const $id = (id) => document.getElementById(id);
export const $qs = (sel) => document.querySelector(sel);
export const $qsa = (sel) => document.querySelectorAll(sel);

export const getValue = (id) => {
  const el = $id(id);
  return el ? el.value.trim() : "";
};

export const setValue = (id, valor) => {
  const el = $id(id);
  if (el) el.value = valor;
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
  if (contenedor) {
    contenedor.innerHTML = "";
  }
};
