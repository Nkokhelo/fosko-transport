export class Vehicle {
  constructor(
    public id: string = '',
    public name: string = '',
    public registrationDate: Date = new Date(),
    public transports: string[] = [],
    public totalTransports = 0
  ) {}
}
