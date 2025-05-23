import { confirmarReserva } from "../logic/confirmarReserva.js";
import { $id } from "../../../shared/ui/index.js";
import { cerrarSliderReserva } from "./components/abrirSliderReservas.js";
import { formController } from "../init/init.js";

export const estadoFormularioReserva = {
  modoEdicion: false,
  idReservaEditando: null,
};

export const resetearEstadoEdicion = () => {
  estadoFormularioReserva.modoEdicion = false;
  estadoFormularioReserva.idReservaEditando = null;
};

// Actualiza el texto del botón según si se está editando o creando
export const actualizarTextoBoton = () => {
  const boton = $id("btn-confirmar-reserva");
  if (!boton) return;
  if (formController?.modoEdicion) {
    boton.textContent = "Guardar cambios";
  } else {
    boton.textContent = "Confirmar reserva";
  }
};

// Inicializa el formulario de nueva reserva
export const formularioNuevaReserva = () => {
  const formulario = $id("formulario-reserva");
  if (!formulario) return;

  actualizarTextoBoton(); // Muestra el texto correcto del botón al cargar

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    formController.confirmar();
  });
};
