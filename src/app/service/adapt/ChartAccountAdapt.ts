export default class ChartAccountAdapt {
    externalChartAccountAdapt: ChartAccountInterface;

    constructor(externalChartAccountAdapt: ChartAccountInterface) {
        this.externalChartAccountAdapt = externalChartAccountAdapt;
    }

    adapt() {
        return this.externalChartAccountAdapt;
    }
}