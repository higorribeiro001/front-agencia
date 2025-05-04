export default class CochoAdapt {
    externalCochoAdapt: CochoInterface;

    constructor(externalCochoAdapt: CochoInterface) {
        this.externalCochoAdapt = externalCochoAdapt;
    }

    adapt() {
        return this.externalCochoAdapt;
    }
}