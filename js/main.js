// Importaciones de formulario de Jugador
import { formularioNuevoJugador } from "../src/features/jugadores/formJugadores.js";
import {
  manejarEventoEliminarJugadores,
  mostrarJugadoresRegistrados,
} from "../src/features/jugadores/ui/cargarJugadores.js";

// Importaciones de reservas
import { mostrarJugadoresParaSeleccionar } from "../src/features/reservas/ui/mostrarJugadores.js";
import { generarFechasDisponibles } from "../src/helpers/fechas/generarFechasDisponibles.js";
import { mostrarFechasDisponibles } from "../src/features/reservas/ui/mostrarFechasDisponibles.js";
import { iniciarHorariosPorDefecto } from "../src/features/reservas/init/iniciarHorarios.js";
import { iniciarCanchas } from "../src/features/reservas/init/iniciarCanchas.js";
import { formularioNuevaReserva } from "../src/features/reservas/ui/formReservas.js";

// Formulario de Jugador

// Jugadores - Ejecutar formulario
formularioNuevoJugador();

// Jugadores - Mostrar jugadores
mostrarJugadoresRegistrados();

// Jugadores - Manejar evento eliminar jugadores
manejarEventoEliminarJugadores();

// Formulario de Reservas

// Reservas - Mostrar jugadores
mostrarJugadoresParaSeleccionar(); // Mostrar jugadores en el formulario de reservas

// Reservas - Mostrar fechas
const fechas = generarFechasDisponibles();
mostrarFechasDisponibles(fechas);

// Reservas - Mostrar horarios
iniciarHorariosPorDefecto();

// Reservas - Iniciar canchas
iniciarCanchas();

// Reservas - Ejecutar formulario
formularioNuevaReserva(); // Ejecutar formulario de reservas
