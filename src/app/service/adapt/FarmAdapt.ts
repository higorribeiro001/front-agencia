export default class FarmAdapt {
    externalFarmAdapt: FarmInterface;

    constructor(externalFarmAdapt: FarmInterface) {
        this.externalFarmAdapt = externalFarmAdapt;
    }

    adapt() {
        return this.externalFarmAdapt;
    }
}