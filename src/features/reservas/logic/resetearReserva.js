import { iniciarHorariosPorDefecto } from "../init/iniciarHorarios.js";
import {
  $id,
  limpiarInput,
  limpiarElemento,
} from "../../../shared/ui/helpers/dom.js";

export const resetearFormularioReserva = () => {
  limpiarInput("hora-seleccionada");
  limpiarInput("cancha-seleccionada");
  limpiarInput("duracion-seleccionada");
  limpiarElemento($id("canchas-disponibles"));

  iniciarHorariosPorDefecto();
};
