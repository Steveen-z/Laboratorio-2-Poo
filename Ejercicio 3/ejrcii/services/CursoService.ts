import { Curso } from "../models/Curso";

export class CursoService {
  cursos: Curso[] = [];

  agregarCurso(curso: Curso) {
    this.cursos.push(curso);
  }

  listarCursos(): Curso[] {
    return this.cursos;
  }
}
