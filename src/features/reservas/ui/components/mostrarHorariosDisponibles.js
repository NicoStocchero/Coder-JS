import {
  renderizarBotonesSeleccionables,
  limpiarContenedor,
} from "../../../../shared/ui/index.js";

const datosHorario = {
  contenedorID: "horarios-disponibles",
  claseBoton: "btn-horario",
  inputID: "hora-seleccionada",
  datasetKey: "hora",
};

// Muestra los botones de horarios disponibles
// Aplica clase según disponibilidad visual (verde/rojo)
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
