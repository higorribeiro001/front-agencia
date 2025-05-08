export default class RevenueAdapt {
    externalRevenueAdapt: RevenueInterface;

    constructor(externalRevenueAdapt: RevenueInterface) {
        this.externalRevenueAdapt = externalRevenueAdapt;
    }

    adapt() {
        return this.externalRevenueAdapt;
    }
}