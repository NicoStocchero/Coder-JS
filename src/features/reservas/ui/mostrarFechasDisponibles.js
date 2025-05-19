import { renderizarBotonesSeleccionables } from "../../../shared/ui/botones.js";
import { iniciarHorarios } from "../init/iniciarHorarios.js";
import { limpiarContenedor } from "../../../shared/ui/dom.js";

const datosFecha = {
  contenedorID: "fechas-disponibles",
  claseBoton: "btn-fecha",
  inputID: "fecha-seleccionada",
  datasetKey: "fecha",
};

const hoy = dayjs().format("YYYY-MM-DD"); // Obtiene la fecha de hoy en formato YYYY-MM-DD
const duracion = 60; // Duración por defecto de 60 minutos

export const mostrarFechasDisponibles = (fechas) => {
  limpiarContenedor(datosFecha.contenedorID);

  renderizarBotonesSeleccionables({
    items: fechas,
    ...datosFecha,
    getValorDataset: (fecha) => fecha.fecha,
    getTexto: (fecha) => dayjs(fecha.fecha).locale("es").format("ddd D MMMM"),
    valorSeleccionado: hoy,
    alSeleccionar: (dataset) => {
      iniciarHorarios(dataset.fecha, duracion);
      limpiarContenedor("canchas-disponibles");
    },
  });
};
