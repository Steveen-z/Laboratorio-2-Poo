import { Asset } from "./Asset";

export class Portfolio {
    private assets: { asset: Asset; quantity: number }[] = [];

    public addAsset(asset: Asset, quantity: number): void {
        if (quantity <= 0) throw Error(`La cantidad debe ser un número positivo o mayor a 0, no ${quantity}.`);
        this.assets.push({ asset, quantity });
    }

    public sellAsset(assetName: string, quantity: number): void {
        const index = this.assets.findIndex(obj => obj.asset.name.toLowerCase() === assetName.toLowerCase());
        if (index === -1) throw Error(`Activo no encontrado.`);
        if (this.assets[index].quantity < quantity) throw Error(`Cantidad insuficiente.`);
        this.assets[index].quantity -= quantity;
        if (this.assets[index].quantity === 0) this.assets.splice(index, 1);
    }

    public getTotalValue(): number {
        return this.assets.reduce((sum, obj) => sum + obj.asset.price * obj.quantity, 0);
    }

    public listAssets(): void {
        this.assets.forEach(obj => {
            console.log(`Nombre: ${obj.asset.name}\nCantidad/Precio: ${obj.quantity} / $${obj.asset.price.toFixed(2)}`);
        });
    }
}