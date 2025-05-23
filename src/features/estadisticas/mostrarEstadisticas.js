import { obtenerDeLocalStorage } from "../../data/storage.js";
import { $id } from "../../shared/ui/index.js";

/**
 * mostrarEstadisticas
 *
 * Calcula estadísticas generales a partir de las reservas guardadas.
 * Devuelve:
 * - Total de reservas
 * - Jugador con más reservas
 * - Horario más reservado
 */
export const mostrarEstadisticas = () => {
  const reservas = obtenerDeLocalStorage("reservas") || [];

  const totalReservas = reservas.length;
  const jugadorMasActivo = obtenerJugadorMasActivo(reservas);
  const horarioMasUsado = obtenerHorarioMasUsado(reservas);

  return {
    totalReservas,
    jugadorMasActivo,
    horarioMasUsado,
  };
};

/**
 * obtenerJugadorMasActivo
 *
 * Busca el jugador que más veces figura en las reservas
 */
const obtenerJugadorMasActivo = (reservas) => {
  const contador = {};

  reservas.forEach((reserva) => {
    const nombre = reserva.nombre;
    if (!contador[nombre]) {
      contador[nombre] = 1;
    } else {
      contador[nombre]++;
    }
  });

  let max = 0;
  let jugadorTop = "-";

  for (const nombre in contador) {
    if (contador[nombre] > max) {
      max = contador[nombre];
      jugadorTop = nombre;
    }
  }

  return jugadorTop;
};

/**
 * obtenerHorarioMasUsado
 *
 * Devuelve la hora con mayor cantidad de reservas
 */
const obtenerHorarioMasUsado = (reservas) => {
  const contador = {};

  reservas.forEach((reserva) => {
    const hora = reserva.hora;
    if (!contador[hora]) {
      contador[hora] = 1;
    } else {
      contador[hora]++;
    }
  });

  let max = 0;
  let horarioTop = "-";

  for (const hora in contador) {
    if (contador[hora] > max) {
      max = contador[hora];
      horarioTop = hora;
    }
  }

  return horarioTop;
};

/**
 * renderizarEstadisticas
 *
 * Muestra las estadísticas calculadas en el DOM:
 * - Total de reservas
 * - Jugador más activo
 * - Horario más frecuente
 * También actualiza el badge de cantidad de reservas.
 */
export const renderizarEstadisticas = () => {
  const { totalReservas, jugadorMasActivo, horarioMasUsado } =
    mostrarEstadisticas();

  actualizarCantidadReservas();

  const $total = $id("stat-total-reservas");
  const $jugador = $id("stat-jugador-top");
  const $horario = $id("stat-horario-top");

  if ($total) $total.innerText = totalReservas;
  if ($jugador) $jugador.innerText = jugadorMasActivo;
  if ($horario) $horario.innerText = horarioMasUsado;
};

/**
 * actualizarCantidadReservas
 *
 * Actualiza el badge visual con el total de reservas activas
 */
const actualizarCantidadReservas = () => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  const badge = $id("badge-cantidad-reservas");

  if (badge) {
    badge.innerText = `${reservas.length} reservas`;
  }
};
