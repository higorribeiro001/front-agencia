export default class OutputProductsAdapt {
    externalOutputProductsAdapt: OutputProductsInterface;

    constructor(externalOutputProductsAdapt: OutputProductsInterface) {
        this.externalOutputProductsAdapt = externalOutputProductsAdapt;
    }

    adapt() {
        return this.externalOutputProductsAdapt;
    }
}