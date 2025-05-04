export default class TypeProductsAdapt {
    externalTypeProductsAdapt: TypeProductsInterface;

    constructor(externalTypeProductsAdapt: TypeProductsInterface) {
        this.externalTypeProductsAdapt = externalTypeProductsAdapt;
    }

    adapt() {
        return this.externalTypeProductsAdapt;
    }
}