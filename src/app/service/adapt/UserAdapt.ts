export default class UserAdapt {
    externalUserAdapt: UserInterface;

    constructor(externalUserAdapt: UserInterface) {
        this.externalUserAdapt = externalUserAdapt;
    }

    adapt() {
        return this.externalUserAdapt;
    }
}