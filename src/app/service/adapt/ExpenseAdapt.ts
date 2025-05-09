export default class ExpenseAdapt {
    externalExpenseAdapt: ExpenseInterface;

    constructor(externalExpenseAdapt: ExpenseInterface) {
        this.externalExpenseAdapt = externalExpenseAdapt;
    }

    adapt() {
        return this.externalExpenseAdapt;
    }
}