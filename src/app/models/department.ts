import { Listing } from '../intefaces/listing';

export class Department implements Listing {
  constructor(
    public id: string = '',
    public name: string = '',
    public createdAt: Date = new Date(),
    public transports: string[] = [],
    public totalTransports = 0
  ) {}
}
