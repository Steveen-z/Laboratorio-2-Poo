import { Asset } from "./Asset";

export class Crypto extends Asset {
    simulatePrice(): void {
        const change = this.price * this.volatility * (Math.random() - 0.5) * 2;
        this.price = Math.max(0, this.price + change);
    }
}