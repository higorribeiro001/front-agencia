export default class TripsAdapt {
    externalTripsAdapt: Trip[];

    constructor(externalTripsAdapt: Trip[]) {
        this.externalTripsAdapt = externalTripsAdapt;
    }

    adapt() {
        return this.externalTripsAdapt;
    }
}