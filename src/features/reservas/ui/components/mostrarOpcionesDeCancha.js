import {
  $id,
  limpiarElemento,
  setValue,
  renderizarBotonesSeleccionables,
} from "../../../../shared/ui/index.js";

const datosCancha = {
  contenedorID: "canchas-disponibles",
  claseBoton: "btn-cancha",
  inputID: "cancha-seleccionada",
  datasetKey: "valor",
};

// Muestra los botones de canchas disponibles para una fecha y horario
// Cada opción incluye el nombre de la cancha y duración
export const mostrarOpcionesDeCancha = ({ canchas: opciones }) => {
  const contenedor = $id(datosCancha.contenedorID);
  limpiarElemento(contenedor); // Limpia las opciones anteriores

  renderizarBotonesSeleccionables({
    items: opciones,
    ...datosCancha,
    getValorDataset: (opcion) => `${opcion.cancha}-${opcion.duracion}`,
    getTexto: (opcion) => `
      <span class="texto-cancha-nombre">${opcion.cancha}</span>
      <span class="texto-cancha-duracion">${opcion.duracion} min</span>
    `,
    getDatasetExtra: (opcion) => ({
      valor: `${opcion.cancha}-${opcion.duracion}`, // Necesario para que coincida con el input
      fecha: opcion.fecha,
      hora: opcion.hora,
      duracion: opcion.duracion,
    }),
    alSeleccionar: (dataset) =>
      setValue("duracion-seleccionada", dataset.duracion), // Actualiza el input oculto
  });
};
