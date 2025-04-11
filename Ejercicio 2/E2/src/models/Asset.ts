// O - Open/Closed 

export abstract class Asset {
    constructor(
        public name: string,
        public price: number,
        public volatility: number
    ) {}

    abstract simulatePrice(): void;
}