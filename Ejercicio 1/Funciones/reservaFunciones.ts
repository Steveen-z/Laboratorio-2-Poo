// funciones/reservaFunciones.ts
import { ReservaService } from '../services/ReservaService';
import readline from 'readline';
import { Reserva } from '../Clases/Reserva';

export function preguntarNombreCliente(rl: readline.Interface): Promise<string> {
  return new Promise(resolve => {
    rl.question('Nombre del cliente: ', nombre => {
      const nombreValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nombre.trim());
      
      if (!nombre.trim()) {
        console.log('El nombre no puede estar vacío.');
        resolve(preguntarNombreCliente(rl)); 
      } else if (!nombreValido) {
        console.log('El nombre no puede contener números.');
        resolve(preguntarNombreCliente(rl)); 
      } else {
        resolve(nombre); 
      }
    });
  });
}

export function preguntarTelefono(rl: readline.Interface): Promise<string> {
  return new Promise(resolve => {
    rl.question('Teléfono: ', tel => {
      const telRegex = /^\d{8}$/;
      if (!telRegex.test(tel)) {
        console.log(' Teléfono inválido. Debe contener 8 dígitos.');
        resolve(preguntarTelefono(rl));
      } else {
        resolve(tel);
      }
    });
  });
}

export function preguntarFrecuente(rl: readline.Interface): Promise<boolean> {
  return new Promise(resolve => {
    rl.question('¿Es cliente frecuente? (s/n): ', respuesta => {
      resolve(respuesta.trim().toLowerCase() === 's');
    });
  });
}


export function preguntarFecha(rl: readline.Interface): Promise<Date> {
  return new Promise(resolve => {
    rl.question('Fecha de la reserva con al menos tres días de anticipación y 2 semanas como maximo\nFormato: (YYYY-MM-DD): ', fechaStr => {
      const fecha = new Date(fechaStr);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Limpiar hora

      const fechaMinima = new Date(hoy);
      fechaMinima.setDate(hoy.getDate() + 3); // Mínimo 3 días de anticipación

      const fechaMaxima = new Date(hoy);
      fechaMaxima.setDate(hoy.getDate() + 14); // Máximo 2 semanas

      // Validación de fecha
      if (isNaN(fecha.getTime())) {
        console.log('La fecha es inválida.');
        resolve(preguntarFecha(rl));
      } else if (fecha < fechaMinima) {
        console.log('La fecha debe ser al menos con 3 días de anticipación.');
        resolve(preguntarFecha(rl));
      } else if (fecha > fechaMaxima) {
        console.log('Solo se pueden hacer reservas dentro de las próximas 2 semanas.');
        resolve(preguntarFecha(rl));
      } else {
        resolve(fecha);
      }
    });
  });
}


export function preguntarHora(rl: readline.Interface): Promise<string> {
  return new Promise(resolve => {
    rl.question('Hora de la reserva (HH:mm, entre 12:00 y 22:00): ', hora => {
      const [h, m] = hora.split(':').map(Number);
      if (h < 12 || h > 22 || isNaN(h) || isNaN(m)) {
        console.log('Hora fuera de horario laboral.');
        resolve(preguntarHora(rl));
      } else {
        resolve(hora);
      }
    });
  });
}

export function preguntarComensales(rl: readline.Interface): Promise<number> {
  return new Promise(resolve => {
    rl.question('Número de comensales (Maximo 4): ', input => {
      const n = parseInt(input);
      if (isNaN(n) || n <= 0) {
        console.log(' Número inválido.');
        resolve(preguntarComensales(rl));
      } else {
        resolve(n);
      }
    });
  });
}

export function mostrarReservas(reservaService: ReservaService, rl: readline.Interface, callback: () => void) {
  const reservas = reservaService.obtenerReservas();
  if (reservas.length === 0) {
    console.log('No hay reservas.');
  } else {
    reservas.forEach((r, i) => {
      console.log(`\n[${i + 1}] ${r.fecha.toLocaleString()} - ${r.cliente.nombre} (Mesa ${r.mesa.id})`);
    });
  }
  callback();
}

export function editarReserva(reservaService: ReservaService, rl: readline.Interface, callback: () => void) {
  const reservas = reservaService.obtenerReservas();
  if (reservas.length === 0) {
    console.log('No hay reservas para editar.');
    return callback();
  }

  mostrarReservas(reservaService, rl, () => {
    rl.question('\nIngrese el número de la reserva a editar: ', async input => {
      const index = parseInt(input) - 1;
      if (isNaN(index) || index < 0 || index >= reservas.length) {
        console.log(' Índice inválido.');
        return callback();
      }

      const nuevaFecha = await preguntarFecha(rl);
      const nuevaHora = await preguntarHora(rl);
      const nuevaFechaCompleta = new Date(`${nuevaFecha.toISOString().split('T')[0]}T${nuevaHora}:00`);

      const actualizado = reservaService.editarReserva(index, nuevaFechaCompleta);
      console.log(actualizado ? 'Reserva actualizada.' : ' No se pudo actualizar.');
      callback();
    });
  });
}

export function eliminarReserva(reservaService: ReservaService, rl: readline.Interface, callback: () => void) {
  const reservas = reservaService.obtenerReservas();
  if (reservas.length === 0) {
    console.log('No hay reservas para eliminar.');
    return callback();
  }

  mostrarReservas(reservaService, rl, () => {
    rl.question('\nIngrese el número de la reserva a eliminar: ', input => {
      const index = parseInt(input) - 1;
      if (isNaN(index) || index < 0 || index >= reservas.length) {
        console.log('Índice inválido.');
        return callback();
      }

      reservaService.eliminarReserva(index);
      console.log('Reserva eliminada.');
      callback();
    });
  });
}

