export default class CochosAdapt {
    externalCochosAdapt: CochosInterface;

    constructor(externalCochosAdapt: CochosInterface) {
        this.externalCochosAdapt = externalCochosAdapt;
    }

    adapt() {
        return this.externalCochosAdapt;
    }
}