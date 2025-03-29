// Se le da la bienvenida al usuario. Explicando el funcionamiento
alert(
  "Bienvenido. Estás por reservar un turno de Padel. Presiona 'Aceptar' para continuar."
);

// Arrays y funciones globales
const fechasDisponibles = [
  "01/04/2025",
  "02/04/2025",
  "03/04/2025",
  "04/04/2025",
  "05/04/2025",
];

const horariosDisponibles = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

const historialDeReservas = [];

// Registrar reserva en el historial
function registrarReservaenHistorial(reserva) {
  historialDeReservas.push(reserva);
  alert("Reserva registrada en el historial.");
}

// Mostrar historial de reservas
function mostrarHistorialDeReservas() {
  if (historialDeReservas.length === 0) {
    alert("No hay reservas registradas en el historial.");
  } else {
    let historial = "Historial de Reservas:\n\n";
    for (let i = 0; i < historialDeReservas.length; i++) {
      let reserva = historialDeReservas[i];
      historial += `Reserva ${i + 1}: ${reserva.nombre} - ${
        reserva.fechaDeLaReserva
      } - ${reserva.horarioDeLaReserva}\n\n`;
    }
    alert(historial);
  }
}

// Verificar disponibilidad del horario
function verificarDisponibilidad(fecha, horario) {
  return !historialDeReservas.some(
    (reserva) =>
      reserva.fechaDeLaReserva === fecha &&
      reserva.horarioDeLaReserva.includes(horario)
  );
}

// Función principal de reservas
let otraReserva = true;
while (otraReserva) {
  let nombre = prompt("Ingrese su nombre: ");
  nombre = nombre || "Usuario"; // Asigna "Usuario" si el nombre está vacío

  alert(
    `Hola ${nombre}.\n\nA continuación se te mostrarán las 5 próximas fechas disponibles.\nHaz clic en 'Aceptar' para elegir una de ellas.`
  );

  let fechaSeleccionada = null;
  for (let fecha of fechasDisponibles) {
    if (confirm(`¿Quieres seleccionar esta fecha?\n\n${fecha}`)) {
      fechaSeleccionada = fecha;
      break;
    }
  }

  if (!fechaSeleccionada) {
    alert("No seleccionaste ninguna fecha.");
    continue;
  }

  alert(`La fecha seleccionada es: ${fechaSeleccionada}`);

  // Ingreso de horario
  let horarioSeleccionado = prompt(
    "Por favor, ingresa un horario disponible para tu reserva.\nFormato: HH:MM (ejemplo: 08:00, 08:30, ... hasta las 22:30)."
  );

  // Validación de horario
  while (!horariosDisponibles.includes(horarioSeleccionado)) {
    alert(
      "El horario seleccionado no está disponible. Por favor, elige uno de los horarios disponibles."
    );
    horarioSeleccionado = prompt(
      "ERROR\nIngresa un horario válido para tu reserva.\nFormato: HH:MM (ejemplo: 08:00, 08:30, ... hasta las 22:30)."
    );
  }

  // Verificar disponibilidad del horario
  if (!verificarDisponibilidad(fechaSeleccionada, horarioSeleccionado)) {
    alert("Lo sentimos, el horario seleccionado ya está reservado.");
    continue;
  }

  // Duración del turno
  let tiempoDelTurno;
  let tiempoMaximoDelTurno = 180;
  do {
    let entrada = prompt(
      "Ingresa la duración de tu reserva en minutos (múltiplos de 30).\nEjemplo: 30, 60, 90... hasta 180."
    );
    if (entrada === null) break; // Permitir cancelar
    tiempoDelTurno = parseInt(entrada);
  } while (
    isNaN(tiempoDelTurno) ||
    tiempoDelTurno % 30 !== 0 ||
    tiempoDelTurno < 30 ||
    tiempoDelTurno > tiempoMaximoDelTurno
  );

  // Calcular horario final
  let horarioFinal;
  const horarioInicio = horariosDisponibles.indexOf(horarioSeleccionado);
  const intervaloDeHorario = tiempoDelTurno / 30;
  const horarioFinalCalculo = horarioInicio + intervaloDeHorario;

  if (horarioFinalCalculo <= horariosDisponibles.length) {
    horarioFinal = horariosDisponibles[horarioFinalCalculo - 1];
    // Verificar que el horario final no exceda las 23:00
    if (
      horariosDisponibles.indexOf(horarioFinal) >
      horariosDisponibles.indexOf("23:00")
    ) {
      alert(
        "El tiempo de juego seleccionado excede el horario disponible del Club."
      );
      continue;
    }
    alert(`Tu turno es de ${horarioSeleccionado} a ${horarioFinal}`);
  } else {
    alert(
      "El tiempo de juego seleccionado excede el horario disponible del Club."
    );
    continue;
  }

  // Crear objeto reserva y registrar
  const reserva = {
    nombre: nombre,
    fechaDeLaReserva: fechaSeleccionada,
    horarioDeLaReserva: `${horarioSeleccionado} a ${horarioFinal}`,
  };

  alert(
    `Datos de la reserva:\nNombre: ${reserva.nombre}\nFecha: ${reserva.fechaDeLaReserva}\nHorario: ${reserva.horarioDeLaReserva}`
  );

  registrarReservaenHistorial(reserva);
  mostrarHistorialDeReservas();

  otraReserva = confirm("¿Quieres realizar otra reserva?");
}

alert("Fin de la gestión de reservas.");
