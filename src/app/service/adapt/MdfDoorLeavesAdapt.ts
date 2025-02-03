import { MdfDoorLeavesInterface } from "@/data/types";

export default class MdfDoorLeavesAdapt {
    externalMdfDoorLeavesAdapt: MdfDoorLeavesInterface;

    constructor(externalMdfDoorLeavesAdapt: MdfDoorLeavesInterface) {
        this.externalMdfDoorLeavesAdapt = externalMdfDoorLeavesAdapt;
    }

    adapt() {
        return this.externalMdfDoorLeavesAdapt;
    }
}