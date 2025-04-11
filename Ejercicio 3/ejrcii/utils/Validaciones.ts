export class Validaciones {
  static emailValido(email: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
}
