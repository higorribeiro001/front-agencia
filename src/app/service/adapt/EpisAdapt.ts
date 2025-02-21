import { EpisInterface } from "@/data/types";

export default class EpisAdapt {
    externalEpisAdapt: EpisInterface;

    constructor(externalEpisAdapt: EpisInterface) {
        this.externalEpisAdapt = externalEpisAdapt;
    }

    adapt() {
        return this.externalEpisAdapt;
    }
}