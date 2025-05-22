import { obtenerDeLocalStorage } from "../../../data/storage.js";

// Busca un registro por su ID en localStorage y lo devuelve
export const editarRegistro = (id, tipo) => {
  const registros = obtenerDeLocalStorage(tipo);
  const registro = registros.find((item) => item.id === id);
  if (!registro) return;

  return { registro };
};

// Escucha clics sobre botones de edición en un contenedor
// Llama a la función de edición si encuentra el registro
export const manejarEventoEditar = ({
  contenedor,
  tipo,
  etiqueta,
  selector,
  funcion,
}) => {
  if (!contenedor || !selector || typeof funcion !== "function") {
    throw new Error("Faltan parámetros obligatorios");
  }

  contenedor.addEventListener("click", (event) => {
    const botonEditar = event.target.closest(selector);
    if (!botonEditar) return;

    const id = botonEditar.dataset.id;
    const { registro } = editarRegistro(id, tipo);
    if (!registro) return;

    funcion(id, tipo, etiqueta, registro);
  });
};
