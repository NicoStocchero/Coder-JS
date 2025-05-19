import { renderizarBotonesSeleccionables } from "../../../shared/ui/botones.js";

const datosFecha = {
  contenedorID: "fechas-disponibles",
  claseBoton: "btn-fecha",
  inputID: "fecha-seleccionada",
  datasetKey: "fecha",
};

const hoy = dayjs().format("YYYY-MM-DD"); // Obtiene la fecha de hoy en formato YYYY-MM-DD

export const mostrarFechasDisponibles = (fechas) => {
  const contenedorFechas = document.getElementById(datosFecha.contenedorID);
  contenedorFechas.innerHTML = ""; // Limpia el contenedor antes de mostrar las fechas

  renderizarBotonesSeleccionables({
    items: fechas,
    ...datosFecha,
    getValorDataset: (fecha) => fecha.fecha,
    getTexto: (fecha) => dayjs(fecha.fecha).locale("es").format("ddd D MMMM"),
    valorSeleccionado: hoy,
  });
};
