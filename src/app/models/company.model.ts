export class Company {
    constructor(
        public id: number = 0,
        public name: string = null,
        public address: string = null,
        public lat: number = 0,
        public lng: number = 0
    ) {}
}