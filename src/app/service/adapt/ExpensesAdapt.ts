export default class ExpensesAdapt {
    externalExpensesAdapt: ExpensesInterface;

    constructor(externalExpensesAdapt: ExpensesInterface) {
        this.externalExpensesAdapt = externalExpensesAdapt;
    }

    adapt() {
        return this.externalExpensesAdapt;
    }
}