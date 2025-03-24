export default class UsersAdapt {
    externalUsersAdapt: UsersInterface;

    constructor(externalUsersAdapt: UsersInterface) {
        this.externalUsersAdapt = externalUsersAdapt;
    }

    adapt() {
        return this.externalUsersAdapt;
    }
}