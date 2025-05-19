import { validarJugador } from "../../helpers/validation/validarjugador.js"; // Importa la función de validación de jugadores
import {
  mostrarErroresEnFormulario,
  limpiarErroresEnFormulario,
  normalizarFormulario,
} from "../../helpers/manejoDeFormularios.js";
import { agregarJugadorEnLocalStorage } from "./data/gestionarJugadores.js"; // Importa la función para agregar jugadores al almacenamiento local
import { mostrarJugadoresRegistrados } from "./ui/cargarJugadores.js";
import { mostrarJugadoresParaSeleccionar } from "../reservas/ui/mostrarJugadores.js";

export const formularioNuevoJugador = () => {
  const form = document.getElementById("formulario-jugador");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    normalizarFormulario(form); // Normaliza los campos del formulario

    const datos = Object.fromEntries(new FormData(form).entries()); // Convierte todos los datos del formulario en un objeto.

    const errores = validarJugador(datos); // Recibe un objeto con los errores de validación

    if (errores.valido) {
      const fueGuardadoEnLocalStorage = agregarJugadorEnLocalStorage(datos); // Comprueba si se guardó correctamente en localStorage (no permite duplicados)
      limpiarErroresEnFormulario(form);
      if (fueGuardadoEnLocalStorage) {
        Swal.fire({
          title: "Jugador creado con éxito",
          html: `
            <b>Nombre:</b> ${datos.nombre} ${datos.apellido}<br>
            <b>Email:</b> ${datos.email}<br>
            <b>Teléfono:</b> ${datos.telefono}
        `,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        mostrarJugadoresRegistrados(); // Actualizar la lista de jugadores registrados
        mostrarJugadoresParaSeleccionar(); // Actualizar la lista de jugadores para seleccionar
        form.reset(); // Limpiar el formulario
      }
    } else {
      limpiarErroresEnFormulario(form);
      mostrarErroresEnFormulario(errores.errores);
    }
  });
};
