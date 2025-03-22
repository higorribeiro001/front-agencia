export default class DataAdapts {
    externalDataAdapts: DatasInterface;

    constructor(externalDataAdapts: DatasInterface) {
        this.externalDataAdapts = externalDataAdapts;
    }

    adapt() {
        return this.externalDataAdapts;
    }
}