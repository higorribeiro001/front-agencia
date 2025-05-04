export default class SupplierAdapt {
    externalSupplierAdapt: SupplierInterface;

    constructor(externalSupplierAdapt: SupplierInterface) {
        this.externalSupplierAdapt = externalSupplierAdapt;
    }

    adapt() {
        return this.externalSupplierAdapt;
    }
}