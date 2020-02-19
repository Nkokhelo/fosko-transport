import { Listing } from '../intefaces/listing';

export class Driver implements Listing {
  constructor(
    public readonly id: string = '',
    public name: string = '',
    public createdAt: Date = new Date(),
    public transports: string[] = [],
    public totalTransports = 0
  ) {}
}
