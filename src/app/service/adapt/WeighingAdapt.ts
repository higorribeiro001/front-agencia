export default class WeighingAdapt {
    externalWeighingAdapt: WeighingInterface;

    constructor(externalWeighingAdapt: WeighingInterface) {
        this.externalWeighingAdapt = externalWeighingAdapt;
    }

    adapt() {
        return this.externalWeighingAdapt;
    }
}