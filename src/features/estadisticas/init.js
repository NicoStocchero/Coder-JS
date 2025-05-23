import { renderizarEstadisticas } from "./mostrarEstadisticas.js";
import { generarGrafico } from "./generarGrafico.js";

export const initEstadisticas = () => {
  renderizarEstadisticas();
  generarGrafico();
};
