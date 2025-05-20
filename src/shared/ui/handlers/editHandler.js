import { obtenerDeLocalStorage } from "../../../data/storage.js";

export const editarRegistro = (id, tipo) => {
  const registros = obtenerDeLocalStorage(tipo); // Obtiene todos los registros del tipo especificado
  const registro = registros.find((item) => item.id === id); // Busca el registro a editar por su id

  if (!registro) return;

  return { registro }; // Devuelve el registro encontrado
};

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
