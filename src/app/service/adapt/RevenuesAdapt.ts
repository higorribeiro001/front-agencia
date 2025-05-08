export default class RevenuesAdapt {
    externalRevenuesAdapt: RevenuesInterface;

    constructor(externalRevenuesAdapt: RevenuesInterface) {
        this.externalRevenuesAdapt = externalRevenuesAdapt;
    }

    adapt() {
        return this.externalRevenuesAdapt;
    }
}