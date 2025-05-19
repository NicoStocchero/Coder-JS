import { renderizarBotonesSeleccionables } from "../../../shared/ui/botones.js";

const datosCancha = {
  contenedorID: "canchas-disponibles",
  claseBoton: "btn-cancha",
  inputID: "cancha-seleccionada",
  datasetKey: "valor",
};

export const mostrarOpcionesDeCancha = ({ canchas: opciones }) => {
  const contenedor = document.getElementById(datosCancha.contenedorID);
  contenedor.innerHTML = "";

  renderizarBotonesSeleccionables({
    items: opciones,
    ...datosCancha,
    getValorDataset: (opcion) => `${opcion.cancha}-${opcion.duracion}`,
    getTexto: (opcion) => `${opcion.cancha} (${opcion.duracion} min)`,
    getDatasetExtra: (opcion) => ({
      valor: `${opcion.cancha}-${opcion.duracion}`, // Para que coincida con el valor del dataset (sino generaba conflicto)
      fecha: opcion.fecha,
      hora: opcion.hora,
      duracion: opcion.duracion,
    }),
    alSeleccionar: (dataset) => {
      const duracionSeleccionada = document.getElementById(
        "duracion-seleccionada"
      );
      duracionSeleccionada.value = dataset.duracion;
    },
  });
};
