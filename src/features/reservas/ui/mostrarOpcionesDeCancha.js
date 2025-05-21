import {
  $id,
  limpiarElemento,
  setValue,
  renderizarBotonesSeleccionables,
} from "../../../shared/ui/index.js";

const datosCancha = {
  contenedorID: "canchas-disponibles",
  claseBoton: "btn-cancha",
  inputID: "cancha-seleccionada",
  datasetKey: "valor",
};

export const mostrarOpcionesDeCancha = ({ canchas: opciones }) => {
  const contenedor = $id(datosCancha.contenedorID);
  limpiarElemento(contenedor);

  renderizarBotonesSeleccionables({
    items: opciones,
    ...datosCancha,
    getValorDataset: (opcion) => `${opcion.cancha}-${opcion.duracion}`,
    getTexto: (opcion) => `
  <span class="texto-cancha-nombre">${opcion.cancha}</span>
  <span class="texto-cancha-duracion">${opcion.duracion} min</span>
`,
    getDatasetExtra: (opcion) => ({
      valor: `${opcion.cancha}-${opcion.duracion}`, // Para que coincida con el valor del dataset (sino generaba conflicto)
      fecha: opcion.fecha,
      hora: opcion.hora,
      duracion: opcion.duracion,
    }),
    alSeleccionar: (dataset) =>
      setValue("duracion-seleccionada", dataset.duracion),
  });
};
