export default class FarmsAdapt {
    externalFarmsAdapt: FarmsInterface;

    constructor(externalFarmsAdapt: FarmsInterface) {
        this.externalFarmsAdapt = externalFarmsAdapt;
    }

    adapt() {
        return this.externalFarmsAdapt;
    }
}