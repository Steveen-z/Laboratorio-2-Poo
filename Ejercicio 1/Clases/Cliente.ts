export class Cliente {
    constructor(
      public id: number,
      public nombre: string,
      public telefono: string,
      public esFrecuente: boolean = false
    ) {}
  }
  