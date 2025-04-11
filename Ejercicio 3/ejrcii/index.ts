import { CursoService } from "./services/CursoService";
import { EstudianteService } from "./services/EstudianteService";
import { PagoService } from "./services/PagoService";
import { EstadisticasService } from "./services/EstadisticasService";

const cursoService = new CursoService();
const estudianteService = new EstudianteService();
const pagoService = new PagoService();
const estadisticasService = new EstadisticasService();

console.log("Sistema de Cursos Online iniciado...");
