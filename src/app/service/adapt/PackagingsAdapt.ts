export default class PackagingsAdapt {
    externalPackagingsAdapt: PackagingsInterface;

    constructor(externalPackagingsAdapt: PackagingsInterface) {
        this.externalPackagingsAdapt = externalPackagingsAdapt;
    }

    adapt() {
        return this.externalPackagingsAdapt;
    }
}