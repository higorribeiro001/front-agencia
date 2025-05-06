export default class ChartAccountsAdapt {
    externalChartAccountsAdapt: ChartAccountsInterface;

    constructor(externalChartAccountsAdapt: ChartAccountsInterface) {
        this.externalChartAccountsAdapt = externalChartAccountsAdapt;
    }

    adapt() {
        return this.externalChartAccountsAdapt;
    }
}