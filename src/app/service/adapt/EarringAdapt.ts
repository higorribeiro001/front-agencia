export default class EarringAdapt {
    externalEarringAdapt: EarringInterface;

    constructor(externalEarringAdapt: EarringInterface) {
        this.externalEarringAdapt = externalEarringAdapt;
    }

    adapt() {
        return this.externalEarringAdapt;
    }
}