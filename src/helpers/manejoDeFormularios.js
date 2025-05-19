import {
  normalizarTexto,
  normalizarNombrePropio,
  normalizarEmail,
  normalizarTelefono,
} from "./validaciones.js";

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
  formulario.querySelectorAll(".mensaje-error").forEach((errorElement) => {
    errorElement.textContent = "";
  });
};

export const mostrarErroresEnFormulario = (errores) => {
  for (const campo in errores) {
    const errorElement = document.getElementById(`error-${campo}`);
    if (errorElement) {
      errorElement.textContent = errores[campo]; // Asigna el mensaje de error al elemento correspondiente (un <p> en el HTML)
    }
  }
};
