export default class ProductsAdapt {
    externalProductsAdapt: ProductsInterface;

    constructor(externalProductsAdapt: ProductsInterface) {
        this.externalProductsAdapt = externalProductsAdapt;
    }

    adapt() {
        return this.externalProductsAdapt;
    }
}