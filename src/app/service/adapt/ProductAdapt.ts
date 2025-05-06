export default class ProductAdapt {
    externalProductAdapt: ProductInterface;

    constructor(externalProductAdapt: ProductInterface) {
        this.externalProductAdapt = externalProductAdapt;
    }

    adapt() {
        return this.externalProductAdapt;
    }
}