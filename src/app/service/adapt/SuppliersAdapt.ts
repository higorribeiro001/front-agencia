export default class SuppliersAdapt {
    externalSuppliersAdapt: SuppliersInterface;

    constructor(externalSuppliersAdapt: SuppliersInterface) {
        this.externalSuppliersAdapt = externalSuppliersAdapt;
    }

    adapt() {
        return this.externalSuppliersAdapt;
    }
}