export default class InputProductsAdapt {
    externalInputProductsAdapt: InputProductsInterface;

    constructor(externalInputProductsAdapt: InputProductsInterface) {
        this.externalInputProductsAdapt = externalInputProductsAdapt;
    }

    adapt() {
        return this.externalInputProductsAdapt;
    }
}