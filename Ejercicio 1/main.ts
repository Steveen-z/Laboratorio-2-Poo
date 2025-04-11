// index.ts
import readline from 'readline';
import { Mesa } from './Clases/Mesa';
import { Cliente } from './Clases/Cliente';
import { ReservaService } from './services/ReservaService';
import {
  preguntarNombreCliente,
  preguntarTelefono,
  preguntarFrecuente,
  preguntarFecha,
  preguntarHora,
  preguntarComensales,
  mostrarReservas,
  editarReserva,
  eliminarReserva
} from './Funciones/reservaFunciones';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const mesas: Mesa[] = [];
for (let i = 1; i <= 10; i++) {
  mesas.push(new Mesa(i, i % 2 === 0 ? 4 : 2, i <= 5 ? 'Interior' : 'Exterior'));
}
const reservaService = new ReservaService(mesas);

async function registrarReserva() {
  const nombre = await preguntarNombreCliente(rl);
  const telefono = await preguntarTelefono(rl);
  const frecuente = await preguntarFrecuente(rl);
  const fecha = await preguntarFecha(rl);
  const hora = await preguntarHora(rl);
  const comensales = await preguntarComensales(rl);

  const cliente = new Cliente(Date.now(), nombre, telefono, frecuente);
  const fechaCompleta = new Date(`${fecha.toISOString().split('T')[0]}T${hora}:00`);

  const exito = reservaService.realizarReserva(cliente, fechaCompleta, comensales);
  if (exito) {
    console.log('Reserva realizada con éxito');
  }
  mostrarMenu();
}

function mostrarMenu() {
  console.log('\n--- MENÚ ---');
  console.log('1. Registrar reserva');
  console.log('2. Ver reservas');
  console.log('3. Editar reserva');
  console.log('4. Eliminar reserva');
  console.log('5. Salir');

  rl.question('Seleccione una opción: ', opcion => {
    switch (opcion) {
      case '1': registrarReserva(); break;
      case '2': mostrarReservas(reservaService, rl, mostrarMenu); break;
      case '3': editarReserva(reservaService, rl, mostrarMenu); break;
      case '4': eliminarReserva(reservaService, rl, mostrarMenu); break;
      case '5': rl.close(); break;
      default:
        console.log('Opción no válida.');
        mostrarMenu();
    }
  });
}

console.log('Bienvenido al sistema de reservas de restaurante');
mostrarMenu();
