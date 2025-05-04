export default class TypeProductAdapt {
    externalTypeProductAdapt: TypeProductInterface;

    constructor(externalTypeProductAdapt: TypeProductInterface) {
        this.externalTypeProductAdapt = externalTypeProductAdapt;
    }

    adapt() {
        return this.externalTypeProductAdapt;
    }
}