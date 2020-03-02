export class Transport {
  constructor(
    public id?: string,
    public transportationMonth: string = '',
    public passengers?: Passenger[],
    public totalPassengers: number = 0,
    public companyNo: string = '',
    public reason: string = '',
    public destination: string = '',
    public department: string = '',
    public driver: string = '',
    public vehicle: string = '',
    public timeOut: Date = new Date(),
    public timeIn: Date = new Date(),
    public totalTime: number = 0,
    public kmOut: number = 0,
    public kmIn: number = 0,
    public totalKm: number = 0
  ) {}
}

export class Passenger {
  constructor(public name: string, public surname: string) {}
}
