import {
  renderizarBotonesSeleccionables,
  limpiarContenedor,
} from "../../../../shared/ui/index.js";
import { formController } from "../../init/init.js";
import { cargarCanchasParaHorario } from "../../../reservas/logic/disponibilidad/cargarCanchasParaHorario.js";

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
    valorSeleccionado: formController.reserva.hora,
    getValorDataset: (horario) => horario.hora,
    getTexto: (horario) => horario.hora,
    getClaseExtra: (horario) =>
      horario.disponible ? "btn--disponible" : "btn--no-disponible",
    alSeleccionar: (dataset) => {
      formController.reserva.hora = dataset.hora; // Actualiza la hora en el formulario
      cargarCanchasParaHorario(formController.reserva.fecha, dataset.hora); // más directo
    },
  });
};
