export default class UnityAdapt {
    externalUnityAdapt: UnityInterface;

    constructor(externalUnityAdapt: UnityInterface) {
        this.externalUnityAdapt = externalUnityAdapt;
    }

    adapt() {
        return this.externalUnityAdapt;
    }
}