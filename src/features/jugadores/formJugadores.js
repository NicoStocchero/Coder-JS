import { validarJugador } from "../../shared/validators/index.js";
import {
  mostrarErroresEnFormulario,
  limpiarErroresEnFormulario,
  normalizarFormulario,
  $id,
  notificarExito,
} from "../../shared/ui/index.js";
import { agregarJugadorEnLocalStorage } from "./data/gestionarJugadores.js"; // Importa la función para agregar jugadores al almacenamiento local
import { renderizarJugadores } from "./ui/cargarJugadores.js";

export const formularioNuevoJugador = () => {
  const form = $id("formulario-jugador");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    normalizarFormulario(form); // Normaliza los campos del formulario

    const datos = Object.fromEntries(new FormData(form).entries()); // Convierte todos los datos del formulario en un objeto.

    const errores = validarJugador(datos); // Recibe un objeto con los errores de validación

    if (errores.valido) {
      const fueGuardadoEnLocalStorage = agregarJugadorEnLocalStorage(datos); // Comprueba si se guardó correctamente en localStorage (no permite duplicados)
      limpiarErroresEnFormulario(form);
      if (fueGuardadoEnLocalStorage) {
        notificarExito({
          titulo: "Jugador creado con éxito",
          html: `
          <b>Nombre:</b> ${datos.nombre} ${datos.apellido}<br>
          <b>Email:</b> ${datos.email}<br>
          <b>Teléfono:</b> ${datos.telefono}
        `,
        });
        renderizarJugadores(); // Renderiza la lista de jugadores
        form.reset(); // Limpiar el formulario
      }
    } else {
      limpiarErroresEnFormulario(form);
      mostrarErroresEnFormulario(errores.errores);
    }
  });
};
