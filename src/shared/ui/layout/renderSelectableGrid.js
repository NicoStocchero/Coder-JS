import {
  $id,
  $qsa,
  limpiarContenedor,
  notificarError,
  crearBotonInteractivo,
  limpiarElemento,
} from "../index.js";

/* El parámetro `config` es un objeto que define cómo deben renderizarse los botones interactivos.

Debe incluir las siguientes propiedades:
- contenedorID: ID del contenedor donde se insertarán los botones.
- claseBoton: Clase CSS base que se aplicará a cada botón.
- inputID: ID del input oculto donde se guardará el valor seleccionado.
- datasetKey: Clave del dataset principal que identifica cada botón (ej: "fecha", "jugador").

- items: Array de elementos base a transformar en botones.
- getValorDataset: Función que toma un elemento y devuelve el valor a asignar al dataset principal.
- getTexto: Función que toma un elemento y devuelve el texto visible del botón.

Opcionales:
- getClaseExtra: Función que devuelve una clase adicional (por disponibilidad, estado, etc.). Util para mostrar si está disponible o no.
- getDatasetExtra: Función que devuelve un objeto con más atributos `data-*` para el botón. Util para los botones de cancha por ejemplo.
- valorSeleccionado: Valor que se debería marcar como seleccionado al iniciar (opcional). Util para mostrar la fecha de hoy por ejemplo.
- alSeleccionar: Función que se ejecuta al seleccionar un botón. Recibe el dataset del botón seleccionado como argumento.

Este objeto `config` se reutiliza para cualquier tipo de botón seleccionable:
fechas, horarios, canchas, jugadores, etc.

Ejemplo de uso:

const config = {
  contenedorID: "canchas-disponibles",
  claseBoton: "btn-cancha",
  inputID: "cancha-seleccionada",
  datasetKey: "valor",
  items: canchas,
  getValorDataset: (opcion) => `${opcion.cancha}-${opcion.duracion}`,
  getTexto: (opcion) => `${opcion.cancha} (${opcion.duracion} min)`,
  getClaseExtra: (opcion) => (opcion.disponible ? "" : "no-disponible"),
  getDatasetExtra: (opcion) => ({
    cancha: opcion.cancha,
    fecha: opcion.fecha,
    hora: opcion.hora,
    duracion: opcion.duracion,
  }),
};

*/

const obtenerBotones = ({ contenedorID, claseBoton }) => {
  const contenedor = $id(contenedorID);
  const botones = $qsa(`.${claseBoton}`, contenedor);
  return Array.from(botones);
};

const desmarcarBotones = (botones) => {
  for (const boton of botones) {
    boton.classList.remove("seleccionado");
    boton.removeAttribute("aria-selected");
  }
};

const encontrarBotonPorValor = (botones, datasetKey, valorBuscado) => {
  for (const boton of botones) {
    if (boton.dataset[datasetKey] === valorBuscado) {
      return boton;
    }
  }
};

const aplicarSeleccion = (boton, inputID, valorSeleccionado) => {
  if (boton) {
    boton.classList.add("seleccionado");
    boton.setAttribute("aria-selected", "true");
    const input = $id(inputID);
    if (input) {
      input.value = valorSeleccionado;
    } else {
      notificarError({
        mensaje: `No se encontró el input con ID ${inputID}.`,
      });
    }
  }
};

/* Marca un botón como seleccionado y actualiza el valor de un input oculto.
También desmarca los demás botones en el contenedor. 
*/
export const marcarBotonSeleccionado = (
  contenedorID,
  claseBoton,
  inputID,
  datasetKey,
  valorSeleccionado
) => {
  const botones = obtenerBotones({
    contenedorID,
    claseBoton,
  });
  desmarcarBotones(botones);
  const botonASeleccionar = encontrarBotonPorValor(
    botones,
    datasetKey,
    valorSeleccionado
  );
  if (botonASeleccionar) {
    aplicarSeleccion(botonASeleccionar, inputID, valorSeleccionado);
  }
};

// --------------------------- Creación de botones ------------------------------------

// Genera un botón HTML basado en un item y en las reglas definidas por el objeto config.
// Aplica clases, dataset y texto dinámicamente según cada item.
// Devuelve un botón listo para insertar en el DOM.
const crearBotonDesdeItem = (item, config) => {
  const dataset = {
    [config.datasetKey]: config.getValorDataset(item),
    ...(config.getDatasetExtra ? config.getDatasetExtra(item) : {}),
  };

  const clasesExtra = config.getClaseExtra ? [config.getClaseExtra(item)] : [];

  const boton = crearBotonInteractivo({
    texto: config.getTexto(item),
    clase: config.claseBoton,
    dataset,
    clasesExtra,
  });

  return boton;
};

// Asigna un evento click al botón para que dispare la lógica de selección general.
// Esto actualiza la UI y el input oculto con el valor seleccionado.
const asignarEventoDeSeleccion = (boton, config, valorSeleccionado) => {
  boton.addEventListener("click", () => {
    marcarBotonSeleccionado(
      config.contenedorID,
      config.claseBoton,
      config.inputID,
      config.datasetKey,
      valorSeleccionado
    );

    if (typeof config.alSeleccionar === "function") {
      config.alSeleccionar(boton.dataset);
    }
  });
};

// Función principal para renderizar botones seleccionables en un contenedor específico.
// Requiere del objeto `config` que define cómo deben ser los botones.
export const renderizarBotonesSeleccionables = (config) => {
  // Validaciones iniciales para asegurar que el contenedor y la clase de botón existen.
  // Se utiliza un return temprano para evitar la ejecución innecesaria y posibles errores.
  if (!config.contenedorID || !config.claseBoton) return;
  if (!config.items || config.items.length === 0) return;

  const contenedor = $id(config.contenedorID);
  limpiarElemento(contenedor);

  const botonesGenerados = [];

  for (const item of config.items) {
    const boton = crearBotonDesdeItem(item, config);
    asignarEventoDeSeleccion(boton, config, boton.dataset[config.datasetKey]);
    contenedor.appendChild(boton);
    botonesGenerados.push(boton);
  }

  if (config.valorSeleccionado) {
    const botonASeleccionar = encontrarBotonPorValor(
      botonesGenerados,
      config.datasetKey,
      config.valorSeleccionado
    );
    if (botonASeleccionar) {
      marcarBotonSeleccionado(
        config.contenedorID,
        config.claseBoton,
        config.inputID,
        config.datasetKey,
        config.valorSeleccionado
      );
    }
  }
};
