export default class EarringDropsAdapt {
    externalEarringDropsAdapt: EarringDropsInterface;

    constructor(externalEarringDropsAdapt: EarringDropsInterface) {
        this.externalEarringDropsAdapt = externalEarringDropsAdapt;
    }

    adapt() {
        return this.externalEarringDropsAdapt;
    }
}