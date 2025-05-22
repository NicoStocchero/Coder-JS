import { confirmarReserva } from "../logic/confirmarReserva.js";
import { $id } from "../../../shared/ui/index.js";
import { cerrarSliderReserva } from "./components/abrirSliderReservas.js";

// Estado global del formulario de reserva
export const estadoFormularioReserva = {
  modoEdicion: false,
  idReservaEditando: null,
};

// Actualiza el texto del botón según si se está editando o creando
export const actualizarTextoBoton = () => {
  const boton = $id("boton-confirmar-reserva");
  if (!boton) return;
  if (estadoFormularioReserva.modoEdicion) {
    boton.textContent = "Guardar cambios";
  } else {
    boton.textContent = "Confirmar reserva";
  }
};

// Reinicia el estado del formulario una vez confirmada o cancelada la acción
export const resetearEstadoEdicion = () => {
  estadoFormularioReserva.modoEdicion = false;
  estadoFormularioReserva.idReservaEditando = null;
  actualizarTextoBoton();
};

// Inicializa el formulario de nueva reserva
export const formularioNuevaReserva = () => {
  const formulario = $id("formulario-reserva");
  if (!formulario) return;

  actualizarTextoBoton(); // Muestra el texto correcto del botón al cargar

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fueConfirmada = await confirmarReserva({
      modoEdicion: estadoFormularioReserva.modoEdicion,
      idAnterior: estadoFormularioReserva.idReservaEditando,
    });

    if (fueConfirmada) {
      cerrarSliderReserva(); // Oculta el formulario deslizante
      resetearEstadoEdicion(); // Limpia el estado global
    }
  });
};
