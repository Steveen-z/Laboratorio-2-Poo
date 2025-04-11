import { Cliente } from '../Clases/Cliente';
import { Reserva } from '../Clases/Reserva';
import { Mesa } from '../Clases/Mesa';

export class ReservaService {
  private reservas: Reserva[] = [];
  private mesas: Mesa[];

  constructor(mesas: Mesa[]) {
    this.mesas = mesas;
  }

  public realizarReserva(cliente: Cliente, fecha: Date, comensales: number): boolean {
    const mesaDisponible = this.encontrarMesaDisponible(fecha, comensales);
    if (!mesaDisponible) {
      console.log('No hay mesas disponibles para esa fecha y hora.');
      return false;
    }

    const reserva = new Reserva(Date.now(), cliente, mesaDisponible, fecha, comensales);
    this.reservas.push(reserva);
    return true;
  }

  public obtenerReservas(): Reserva[] {
    return this.reservas;
  }

  public editarReserva(index: number, nuevaFecha: Date): boolean {
    if (index < 0 || index >= this.reservas.length) return false;
    const reservaOriginal = this.reservas[index];
    const mesaDisponible = this.encontrarMesaDisponible(nuevaFecha, reservaOriginal.numComensales);
    if (!mesaDisponible) return false;

    reservaOriginal.fecha = nuevaFecha;
    reservaOriginal.mesa = mesaDisponible;
    return true;
  }

  public eliminarReserva(index: number): boolean {
    if (index < 0 || index >= this.reservas.length) return false;
    this.reservas.splice(index, 1);
    return true;
  }

  private encontrarMesaDisponible(fecha: Date, comensales: number): Mesa | null {
    const reservasEnHora = this.reservas.filter(
      r => r.fecha.toISOString().slice(0, 16) === fecha.toISOString().slice(0, 16)
    );

    if (reservasEnHora.length >= 10) return null;

    const mesasOcupadas = reservasEnHora.map(r => r.mesa.id);
    return this.mesas.find(m => m.capacidad >= comensales && !mesasOcupadas.includes(m.id)) || null;
  }
}

