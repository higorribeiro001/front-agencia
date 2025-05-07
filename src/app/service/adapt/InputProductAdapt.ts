export default class InputProductAdapt {
    externalInputProductAdapt: InputProductInterface;

    constructor(externalInputProductAdapt: InputProductInterface) {
        this.externalInputProductAdapt = externalInputProductAdapt;
    }

    adapt() {
        return this.externalInputProductAdapt;
    }
}