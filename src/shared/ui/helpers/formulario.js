import {
  normalizarTexto,
  normalizarNombrePropio,
  normalizarEmail,
  normalizarTelefono,
} from "../../../shared/validators/index.js";
import { $id, $qsa } from "./dom.js";

// Normaliza todos los campos del formulario antes de validar/guardar
export const normalizarFormulario = (formulario) => {
  const elementos = formulario.elements;

  for (const elemento of elementos) {
    if (elemento.name === "nombre" || elemento.name === "apellido") {
      elemento.value = normalizarNombrePropio(elemento.value);
    } else if (elemento.type === "textarea" || elemento.type === "text") {
      elemento.value = normalizarTexto(elemento.value);
    } else if (elemento.type === "email") {
      elemento.value = normalizarEmail(elemento.value);
    } else if (elemento.type === "tel") {
      elemento.value = normalizarTelefono(elemento.value);
    }
  }
};

// Limpia los mensajes de error visibles en el formulario
export const limpiarErroresEnFormulario = (formulario) => {
  $qsa(".mensaje-error", formulario).forEach((errorElement) => {
    errorElement.textContent = "";
  });
};

// Muestra los errores validados en su respectivo elemento
export const mostrarErroresEnFormulario = (errores) => {
  for (const campo in errores) {
    const errorElement = $id(`error-${campo}`);
    if (errorElement) {
      errorElement.textContent = errores[campo];
    }
  }
};

// Inicializa el formulario con validación, guardado y renderizado posterior
export const inicializarFormulario = (formID, validar, guardar, renderizar) => {
  const form = $id(formID);
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    normalizarFormulario(form);

    const datos = Object.fromEntries(new FormData(form).entries());
    const errores = validar(datos);

    if (errores.valido) {
      if (guardar(datos)) {
        limpiarErroresEnFormulario(form);
        notificarExito({ titulo: "Éxito", mensaje: "Guardado correctamente" });
        renderizar();
        form.reset();
      }
    } else {
      limpiarErroresEnFormulario(form);
      mostrarErroresEnFormulario(errores.errores);
    }
  });
};
