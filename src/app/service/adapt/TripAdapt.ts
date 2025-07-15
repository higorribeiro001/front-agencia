export default class TripAdapt {
    externalTripAdapt: Trip;

    constructor(externalTripAdapt: Trip) {
        this.externalTripAdapt = externalTripAdapt;
    }

    adapt() {
        return this.externalTripAdapt;
    }
}