export class Destination {
  constructor(
    public readonly id: string = '',
    public name: string = '',
    public transports: string[],
    public totalTransports
  ) {}
}
