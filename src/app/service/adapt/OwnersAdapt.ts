export default class OwnersAdapt {
    externalOwnersAdapt: OwnersInterface;

    constructor(externalOwnersAdapt: OwnersInterface) {
        this.externalOwnersAdapt = externalOwnersAdapt;
    }

    adapt() {
        return this.externalOwnersAdapt;
    }
}