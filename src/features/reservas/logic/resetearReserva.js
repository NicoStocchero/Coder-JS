import { iniciarHorariosPorDefecto } from "../init/iniciarHorarios.js";
import {
  $id,
  limpiarInput,
  limpiarElemento,
} from "../../../shared/ui/helpers/dom.js";

// Limpia el formulario de reserva y reinicia los horarios
export const resetearFormularioReserva = () => {
  limpiarInput("hora-seleccionada"); // Limpia el input de horario
  limpiarInput("cancha-seleccionada"); // Limpia el input de cancha
  limpiarInput("duracion-seleccionada"); // Limpia el input de duración
  limpiarElemento($id("canchas-disponibles")); // Borra los botones de cancha

  iniciarHorariosPorDefecto(); // Vuelve a mostrar los horarios del día actual
};
