import {
  renderizarBotonesSeleccionables,
  limpiarContenedor,
} from "../../../shared/ui/index.js";
import { iniciarHorarios } from "../init/iniciarHorarios.js";

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
    getTexto: (fecha) => {
      const fechaDayjs = dayjs(fecha.fecha).locale("es");
      const dia = fechaDayjs.format("ddd"); // ej: "mié."
      const numero = fechaDayjs.format("D"); // ej: "21"

      return `
        <span class="texto-dia">${dia}</span>
        <span class="texto-numero">${numero}</span>
      `;
    },
    valorSeleccionado: hoy,
    alSeleccionar: (dataset) => {
      iniciarHorarios(dataset.fecha, duracion);
      limpiarContenedor("canchas-disponibles");
    },
  });
};
