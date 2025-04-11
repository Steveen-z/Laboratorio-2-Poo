export class Mesa {
    constructor(
      public id: number,
      public capacidad: number,
      public ubicacion: string,
      public disponible: boolean = true
    ) {}
  }
  