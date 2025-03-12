export default class MeAdapt {
    externalMeAdapt: MeAdaptInterface;

    constructor(externalMeAdapt: MeAdaptInterface) {
        this.externalMeAdapt = externalMeAdapt;
    }

    adapt() {
        return this.externalMeAdapt;
    }
}