export default class LogisticsAdapt {
    externalLogisticsAdapt: LogisticsInterface;

    constructor(externalLogisticsAdapt: LogisticsInterface) {
        this.externalLogisticsAdapt = externalLogisticsAdapt;
    }

    adapt() {
        return this.externalLogisticsAdapt;
    }
}