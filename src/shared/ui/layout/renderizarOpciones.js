import { limpiarElemento } from "../helpers/dom.js";

// Rellena un <select> con opciones dinámicas
// Muestra una opción por defecto al principio
export const renderizarOpciones = ({
  elemento,
  datos,
  getTexto,
  getValor,
  defaultText = "Seleccionar una opción",
}) => {
  limpiarElemento(elemento); // Limpia el select antes de renderizar

  const opcionDefault = document.createElement("option");
  opcionDefault.value = "";
  opcionDefault.textContent = defaultText;
  opcionDefault.disabled = true;
  opcionDefault.selected = true;
  elemento.appendChild(opcionDefault);

  for (const item of datos) {
    const opcion = document.createElement("option");
    opcion.value = getValor(item);
    opcion.textContent = getTexto(item);
    elemento.appendChild(opcion);
  }
};
