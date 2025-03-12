class FormBuilder {
    formBuilder: FormBuilderInterface;

    constructor() {
        this.formBuilder = {
            formFields: [],
        }
    }

    addTextField(name: string, label: string, type: string = '') {
        this.formBuilder.formFields.push({
            name,
            label, 
            type, 
        });

        return this;
    }

    build() {
        return this.formBuilder.formFields;
    }
}

export default FormBuilder;