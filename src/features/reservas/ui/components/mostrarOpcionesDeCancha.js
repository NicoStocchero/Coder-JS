import {
  $id,
  limpiarElemento,
  setValue,
  renderizarBotonesSeleccionables,
  marcarBotonSeleccionado,
} from "../../../../shared/ui/index.js";
import { formController } from "../../init/init.js";

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
  console.log(
    "🧪 Valor que intenta seleccionar:",
    formController.reserva.canchaSeleccionada
  );
  console.log("🧪 Todos los botones generados:");
  opciones.forEach((op) => console.log(`${op.cancha}-${op.duracion}`));
  renderizarBotonesSeleccionables({
    items: opciones,
    ...datosCancha,
    valorSeleccionado: formController.reserva.canchaSeleccionada,
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
      cancha: opcion.cancha,
    }),
    alSeleccionar: (dataset) => {
      formController.reserva.duracion = dataset.duracion; // Actualiza la duración en el formulario
      formController.reserva.cancha = dataset.cancha; // Actualiza la cancha en el formulario

      formController.reserva.canchaSeleccionada = `${dataset.cancha}-${dataset.duracion}`;

      setValue("cancha-seleccionada", dataset.cancha);
      setValue("duracion-seleccionada", dataset.duracion);
    },
  });
};
