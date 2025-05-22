import {
  $id,
  $qsa,
  limpiarContenedor,
  notificarError,
  crearBotonInteractivo,
  limpiarElemento,
} from "../index.js";

// Devuelve todos los botones dentro del contenedor
const obtenerBotones = ({ contenedorID, claseBoton }) => {
  const contenedor = $id(contenedorID);
  const botones = $qsa(`.${claseBoton}`, contenedor);
  return Array.from(botones);
};

// Desmarca todos los botones seleccionados
const desmarcarBotones = (botones) => {
  for (const boton of botones) {
    boton.classList.remove("seleccionado");
    boton.removeAttribute("aria-selected");
  }
};

// Busca un botón por valor en el dataset principal
const encontrarBotonPorValor = (botones, datasetKey, valorBuscado) => {
  for (const boton of botones) {
    if (boton.dataset[datasetKey] === valorBuscado) {
      return boton;
    }
  }
};

// Marca el botón seleccionado y actualiza el input oculto
const aplicarSeleccion = (boton, inputID, valorSeleccionado) => {
  if (boton) {
    boton.classList.add("seleccionado");
    boton.setAttribute("aria-selected", "true");

    const input = $id(inputID);
    if (input) {
      input.value = valorSeleccionado;
      input.dispatchEvent(new Event("change"));
    } else {
      notificarError({
        mensaje: `No se encontró el input con ID ${inputID}.`,
      });
    }
  }
};

// Marca el botón correspondiente como seleccionado
export const marcarBotonSeleccionado = (
  contenedorID,
  claseBoton,
  inputID,
  datasetKey,
  valorSeleccionado
) => {
  const botones = obtenerBotones({ contenedorID, claseBoton });
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

// Crea un botón a partir de un ítem usando las reglas definidas en config
const crearBotonDesdeItem = (item, config) => {
  const dataset = {
    [config.datasetKey]: config.getValorDataset(item),
    ...(config.getDatasetExtra ? config.getDatasetExtra(item) : {}),
  };

  const clasesExtra = config.getClaseExtra ? [config.getClaseExtra(item)] : [];

  return crearBotonInteractivo({
    texto: config.getTexto(item),
    clase: config.claseBoton,
    dataset,
    clasesExtra,
    usarHTML: true,
  });
};

// Asocia el evento click al botón para que active la lógica de selección
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

// Renderiza botones interactivos en base al config
export const renderizarBotonesSeleccionables = (config) => {
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
      for (const boton of botonesGenerados) {
        if (
          config.valorSeleccionado &&
          boton.dataset[config.datasetKey] === config.valorSeleccionado
        ) {
          boton.classList.add("seleccionado");
          boton.setAttribute("aria-selected", "true");
        }
      }
      aplicarSeleccion(
        botonASeleccionar,
        config.inputID,
        config.valorSeleccionado
      );

      if (typeof config.alSeleccionar === "function") {
        config.alSeleccionar(botonASeleccionar.dataset);
      }
    }
  }
};
