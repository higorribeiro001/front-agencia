export default class ListOrdersAdapt {
    externalListOrdersAdapt: OrderInterface[];

    constructor(externalListOrdersAdapt: OrderInterface[]) {
        this.externalListOrdersAdapt = externalListOrdersAdapt;
    }

    adapt() {
        return this.externalListOrdersAdapt;
    }
}