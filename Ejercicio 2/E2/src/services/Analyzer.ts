import { Asset } from "../models/Asset";

export class Analyzer {
    static projectFutureValue(asset: Asset, days: number): number[] {
        const projections: number[] = [];
        let simulatedPrice = asset.price;
        for (let index = 0; index < days; index++) {
            const change = simulatedPrice * asset.volatility * (Math.random() - 0.5);
            simulatedPrice = Math.max(0, simulatedPrice + change);
            projections.push(simulatedPrice);
        }
        return projections;
    }

    public static calculatePerformance(currentPrice: number, initialPrice: number): string {
        const change = currentPrice - initialPrice;
        const percent = (change / initialPrice) * 100;
        return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}% (${change >= 0 ? 'ganancia' : 'pérdida'})`;
    }
}