export default class DataAdapt {
    externalDataAdapt: DataInterface;

    constructor(externalDataAdapt: DataInterface) {
        this.externalDataAdapt = externalDataAdapt;
    }

    adapt() {
        return this.externalDataAdapt;
    }
}