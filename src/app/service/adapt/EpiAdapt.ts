import { EpiInterface } from "@/data/types";

export default class EpiAdapt {
    externalEpiAdapt: EpiInterface;

    constructor(externalEpiAdapt: EpiInterface) {
        this.externalEpiAdapt = externalEpiAdapt;
    }

    adapt() {
        return this.externalEpiAdapt;
    }
}