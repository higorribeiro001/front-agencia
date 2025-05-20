export default class OwnerAdapt {
    externalOwnerAdapt: OwnerInterface;

    constructor(externalOwnerAdapt: OwnerInterface) {
        this.externalOwnerAdapt = externalOwnerAdapt;
    }

    adapt() {
        return this.externalOwnerAdapt;
    }
}