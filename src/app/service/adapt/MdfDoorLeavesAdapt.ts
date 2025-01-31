export default class MdfDoorLeavesAdapt {
    externalMdfDoorLeavesAdapt: MdfDoorLeavesInterface | undefined;

    constructor(externalMdfDoorLeavesAdapt: MdfDoorLeavesInterface) {
        this.externalMdfDoorLeavesAdapt = externalMdfDoorLeavesAdapt;
    }

    adapt() {
        return this.externalMdfDoorLeavesAdapt;
    }
}