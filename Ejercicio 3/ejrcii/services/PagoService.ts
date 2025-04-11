import { Pago } from "../models/Pago";

export class PagoService {
  pagos: Pago[] = [];

  procesarPago(pago: Pago) {
    if (pago.monto <= 0) {
      throw new Error("El monto del pago debe ser mayor a cero");
    }
    this.pagos.push(pago);
  }
}
