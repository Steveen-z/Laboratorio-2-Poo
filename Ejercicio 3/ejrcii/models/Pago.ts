export class Pago {
  constructor(
    public estudianteId: string,
    public cursoId: string,
    public monto: number,
    public fecha: Date = new Date()
  ) {}
}
