export default class OutputProductAdapt {
    externalOutputProductAdapt: OutputProductInterface;

    constructor(externalOutputProductAdapt: OutputProductInterface) {
        this.externalOutputProductAdapt = externalOutputProductAdapt;
    }

    adapt() {
        return this.externalOutputProductAdapt;
    }
}