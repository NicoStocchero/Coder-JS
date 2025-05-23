import { obtenerDeLocalStorage } from "../../data/storage.js";

// Instancia del gráfico actual para poder reemplazarlo si ya existe
let graficoReserva = null;

/**
 * generarGrafico
 *
 * Genera un gráfico de barras con la cantidad de reservas por hora.
 * Se actualiza cada vez que se modifica una reserva.
 */
export const generarGrafico = () => {
  const listaReserva = obtenerDeLocalStorage("reservas") || [];

  // Contador de reservas por hora
  const conteoPorHora = {};
  listaReserva.forEach(({ hora }) => {
    conteoPorHora[hora] = (conteoPorHora[hora] || 0) + 1;
  });

  // Transformar el objeto a array ordenado por hora
  const horasConReserva = [];
  for (let hora in conteoPorHora) {
    horasConReserva.push([hora, conteoPorHora[hora]]);
  }

  horasConReserva.sort((a, b) => {
    const [h1] = a[0].split(":").map(Number);
    const [h2] = b[0].split(":").map(Number);
    return h1 - h2;
  });

  // Extraer etiquetas (hora) y valores (cantidad)
  const etiquetas = [];
  const valores = [];
  for (let i = 0; i < horasConReserva.length; i++) {
    etiquetas.push(horasConReserva[i][0]);
    valores.push(horasConReserva[i][1]);
  }

  const ctx = document.getElementById("grafico-horarios").getContext("2d");

  if (graficoReserva) {
    graficoReserva.destroy();
  }

  graficoReserva = new Chart(ctx, {
    type: "bar",
    data: {
      labels: etiquetas,
      datasets: [
        {
          label: "Reservas por hora",
          data: valores,
          backgroundColor: "#f97316",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
    },
  });
};
