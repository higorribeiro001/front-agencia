export default class MdfDoorLeaveAdapt {
    externalMdfDoorLeaveAdapt: MdfDoorLeaveInterface | undefined;

    constructor(externalMdfDoorLeavesAdapt: MdfDoorLeaveInterface) {
        this.externalMdfDoorLeaveAdapt = externalMdfDoorLeavesAdapt;
    }

    adapt() {
        return this.externalMdfDoorLeaveAdapt;
    }
}