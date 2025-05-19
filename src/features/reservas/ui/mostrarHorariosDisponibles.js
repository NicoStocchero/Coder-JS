import { renderizarBotonesSeleccionables } from "../../../shared/ui/botones.js";
import { limpiarContenedor } from "../../../shared/ui/dom.js";

const datosHorario = {
  contenedorID: "horarios-disponibles",
  claseBoton: "btn-horario",
  inputID: "hora-seleccionada",
  datasetKey: "hora",
};

export const mostrarHorariosDisponibles = (horarios) => {
  limpiarContenedor(datosHorario.contenedorID);

  renderizarBotonesSeleccionables({
    items: horarios,
    ...datosHorario,
    getValorDataset: (horario) => horario.hora,
    getTexto: (horario) => horario.hora,
    getClaseExtra: (horario) =>
      horario.disponible ? "btn--disponible" : "btn--no-disponible",
  });
};
