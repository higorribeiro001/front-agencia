export default class MeAdapt {
    externalMeAdapt: MeAdaptInterface | undefined;

    constructor(externalMeAdapt: MeAdaptInterface) {
        this.externalMeAdapt = externalMeAdapt;
    }

    adapt() {
        return this.externalMeAdapt;
    }
}