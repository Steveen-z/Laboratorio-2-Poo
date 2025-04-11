import { Estudiante } from "../models/Estudiante";

export class EstadisticasService {
  obtenerProgreso(estudiante: Estudiante): number {
    const total = Array.from(estudiante.cursosInscritos.values());
    const sum = total.reduce((a, b) => a + b, 0);
    return total.length ? sum / total.length : 0;
  }
}
