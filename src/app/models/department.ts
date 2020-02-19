export class Department {
  constructor(
    public id: string = '',
    public name: string = '',
    public transports: string[],
    public totalTransports
  ) {}
}
