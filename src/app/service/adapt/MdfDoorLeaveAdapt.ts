import { MdfDoorLeaveInterface } from "@/data/types";

export default class MdfDoorLeaveAdapt {
    externalMdfDoorLeaveAdapt: MdfDoorLeaveInterface;

    constructor(externalMdfDoorLeavesAdapt: MdfDoorLeaveInterface) {
        this.externalMdfDoorLeaveAdapt = externalMdfDoorLeavesAdapt;
    }

    adapt() {
        return this.externalMdfDoorLeaveAdapt;
    }
}