export default class OrderAdapt {
    externalOrderAdapt: OrderInterface;

    constructor(externalOrderAdapt: OrderInterface) {
        this.externalOrderAdapt = externalOrderAdapt;
    }

    adapt() {
        return this.externalOrderAdapt;
    }
}