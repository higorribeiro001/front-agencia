export default class WeighingsAdapt {
    externalWeighingsAdapt: WeighingsInterface;

    constructor(externalWeighingsAdapt: WeighingsInterface) {
        this.externalWeighingsAdapt = externalWeighingsAdapt;
    }

    adapt() {
        return this.externalWeighingsAdapt;
    }
}