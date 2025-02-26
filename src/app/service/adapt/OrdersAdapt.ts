export default class OrdersAdapt {
    externalOrdersAdapt: OrdersInterface;

    constructor(externalOrdersAdapt: OrdersInterface) {
        this.externalOrdersAdapt = externalOrdersAdapt;
    }

    adapt() {
        return this.externalOrdersAdapt;
    }
}