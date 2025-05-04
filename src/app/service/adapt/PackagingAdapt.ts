export default class PackagingAdapt {
    externalPackagingAdapt: PackagingInterface;

    constructor(externalPackagingAdapt: PackagingInterface) {
        this.externalPackagingAdapt = externalPackagingAdapt;
    }

    adapt() {
        return this.externalPackagingAdapt;
    }
}