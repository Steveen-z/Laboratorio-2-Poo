import { Curso } from "./Curso";

export class Estudiante {
  cursosInscritos: Map<string, number> = new Map();
  constructor(
    public id: string,
    public nombre: string,
    public email: string
  ) {}

  inscribirCurso(curso: Curso) {
    if (!this.cursosInscritos.has(curso.id)) {
      this.cursosInscritos.set(curso.id, 0);
    }
  }

  avanzarEnCurso(cursoId: string, progreso: number) {
    if (this.cursosInscritos.has(cursoId)) {
      let actual = this.cursosInscritos.get(cursoId)!;
      this.cursosInscritos.set(cursoId, actual + progreso);
    }
  }
}
