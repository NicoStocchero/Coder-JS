import {
  normalizarTexto,
  normalizarNombrePropio,
  normalizarEmail,
  normalizarTelefono,
} from "../../helpers/validation/validaciones.js";
import { $id, $qsa } from "./dom.js";

export const normalizarFormulario = (formulario) => {
  const elementos = formulario.elements;

  for (const elemento of elementos) {
    if (elemento.name === "nombre" || elemento.name === "apellido") {
      elemento.value = normalizarNombrePropio(elemento.value); // Normaliza si el campo es nombre o apellido
    } else if (elemento.type === "textarea" || elemento.type === "text") {
      elemento.value = normalizarTexto(elemento.value);
    } else if (elemento.type === "email") {
      elemento.value = normalizarEmail(elemento.value);
    } else if (elemento.type === "tel") {
      elemento.value = normalizarTelefono(elemento.value);
    }
  }
};

export const limpiarErroresEnFormulario = (formulario) => {
  $qsa(".mensaje-error", formulario).forEach((errorElement) => {
    errorElement.textContent = "";
  });
};

export const mostrarErroresEnFormulario = (errores) => {
  for (const campo in errores) {
    const errorElement = $id(`error-${campo}`);
    if (errorElement) {
      errorElement.textContent = errores[campo]; // Asigna el mensaje de error al elemento correspondiente (un <p> en el HTML)
    }
  }
};
