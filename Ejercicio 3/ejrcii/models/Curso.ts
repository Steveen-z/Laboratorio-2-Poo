import { Leccion } from "./Leccion";
import { Evaluacion } from "./Evaluacion";

export abstract class Curso {
  constructor(
    public id: string,
    public titulo: string,
    public descripcion: string,
    public precio: number,
    public lecciones: Leccion[] = [],
    public evaluaciones: Evaluacion[] = []
  ) {}

  abstract tipo(): string;
}

export class CursoVideo extends Curso {
  tipo(): string {
    return "Video";
  }
}

export class CursoInteractivo extends Curso {
  tipo(): string {
    return "Interactivo";
  }
}

export class CursoEnVivo extends Curso {
  tipo(): string {
    return "En Vivo";
  }
}
