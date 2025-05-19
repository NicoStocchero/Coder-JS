import { renderizarBotonesSeleccionables } from "../../../shared/ui/botones.js";

const datosHorario = {
  contenedorID: "horarios-disponibles",
  claseBoton: "btn-horario",
  inputID: "hora-seleccionada",
  datasetKey: "hora",
};

export const mostrarHorariosDisponibles = (horarios) => {
  const contenedorHorarios = document.getElementById(datosHorario.contenedorID);
  contenedorHorarios.innerHTML = ""; // Limpia el contenedor antes de mostrar los horarios

  renderizarBotonesSeleccionables({
    items: horarios,
    ...datosHorario,
    getValorDataset: (horario) => horario.hora,
    getTexto: (horario) => horario.hora,
    getClaseExtra: (horario) =>
      horario.disponible ? "btn--disponible" : "btn--no-disponible",
  });
};
