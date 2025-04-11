export class Certificacion {
  constructor(
    public estudianteId: string,
    public cursoId: string,
    public fecha: Date = new Date()
  ) {}
}
