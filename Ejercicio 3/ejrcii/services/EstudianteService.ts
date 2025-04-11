import { Estudiante } from "../models/Estudiante";

export class EstudianteService {
  estudiantes: Map<string, Estudiante> = new Map();

  registrar(estudiante: Estudiante) {
    if (this.estudiantes.has(estudiante.id)) {
      throw new Error("Estudiante ya registrado");
    }
    this.estudiantes.set(estudiante.id, estudiante);
  }

  obtener(id: string): Estudiante {
    const estudiante = this.estudiantes.get(id);
    if (!estudiante) throw new Error("Estudiante no encontrado");
    return estudiante;
  }
}
