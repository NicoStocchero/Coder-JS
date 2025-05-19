import { iniciarHorariosPorDefecto } from "../init/iniciarHorarios.js";

export const resetearFormularioReserva = () => {
  document.getElementById("hora-seleccionada").value = "";
  document.getElementById("cancha-seleccionada").value = "";
  document.getElementById("duracion-seleccionada").value = "";
  document.getElementById("canchas-disponibles").innerHTML = "";

  iniciarHorariosPorDefecto();
};
