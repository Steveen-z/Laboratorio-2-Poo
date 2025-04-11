import { Asset } from "../models/Asset";

export class MarketSimulator {
    constructor(
        private assets: Asset[]
    ) {}

    public simulateMarket(): void {
        this.assets.forEach(asset => {
            asset.simulatePrice();
        })
    }
}