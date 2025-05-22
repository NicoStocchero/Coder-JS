import {
  renderizarBotonesSeleccionables,
  limpiarContenedor,
} from "../../../../shared/ui/index.js";
import { iniciarHorarios } from "../../init/iniciarHorarios.js";
import { formController } from "../../init/init.js";

const datosFecha = {
  contenedorID: "fechas-disponibles",
  claseBoton: "btn-fecha",
  inputID: "fecha-seleccionada",
  datasetKey: "fecha",
};

const hoy = dayjs().format("YYYY-MM-DD");
const duracion = 60; // Duración por defecto

// mostrarFechasDisponibles.js
export const alSeleccionarFecha = (dataset) => {
  formController.reserva.fecha = dataset.fecha;
  iniciarHorarios(dataset.fecha, duracion);
  limpiarContenedor("canchas-disponibles");
};

// Muestra las fechas disponibles para reservar
// Marca una por defecto (hoy o la recibida)
// Al seleccionar una fecha, actualiza horarios y limpia las canchas
export const mostrarFechasDisponibles = (fechas, fechaSeleccionada = null) => {
  limpiarContenedor(datosFecha.contenedorID);
  const fechaInicial = fechaSeleccionada ?? hoy;

  renderizarBotonesSeleccionables({
    items: fechas,
    ...datosFecha,
    getValorDataset: (fecha) => fecha.fecha,
    getTexto: (fecha) => {
      const fechaDayjs = dayjs(fecha.fecha).locale("es");
      const dia = fechaDayjs.format("ddd");
      const numero = fechaDayjs.format("D");

      return `
        <span class="texto-dia">${dia}</span>
        <span class="texto-numero">${numero}</span>
      `;
    },
    valorSeleccionado: fechaInicial,
    alSeleccionar: alSeleccionarFecha,
  });
};
