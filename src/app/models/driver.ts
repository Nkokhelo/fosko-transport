export class Driver {
  constructor(
    public readonly id: string = '',
    public name: string = '',
    public registrationDate: Date = new Date(),
    public transports: string[] = [],
    public totalTransports = 0
  ) {}
}
