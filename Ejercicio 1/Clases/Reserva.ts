import { Cliente } from './Cliente';
import { Mesa } from './Mesa';

export class Reserva {
  constructor(
    public id: number,
    public cliente: Cliente,
    public mesa: Mesa,
    public fecha: Date,
    public numComensales: number
  ) {}
}
