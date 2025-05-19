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

  const horariosFiltrados = horarios.filter((h) => h.disponible);

  renderizarBotonesSeleccionables({
    items: horariosFiltrados,
    ...datosHorario,
    getValorDataset: (horario) => horario.hora,
    getTexto: (horario) => horario.hora,
    getClaseExtra: (horario) => {
      if (horario.disponible) {
        return "btn--disponible";
      } else {
        return "btn--no-disponible";
      }
    },
  });
};
