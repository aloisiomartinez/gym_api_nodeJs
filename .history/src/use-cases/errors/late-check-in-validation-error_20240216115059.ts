export class LateCheckInValidationError extends Error {
  constructor() {
    super('Invalid Credentials.')
  }
}