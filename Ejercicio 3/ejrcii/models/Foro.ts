export class MensajeForo {
  constructor(
    public estudianteId: string,
    public mensaje: string,
    public fecha: Date = new Date()
  ) {}
}

export class Foro {
  mensajes: MensajeForo[] = [];

  agregarMensaje(mensaje: MensajeForo) {
    this.mensajes.push(mensaje);
  }
}
