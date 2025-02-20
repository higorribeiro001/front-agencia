import { ChangeEvent } from "react";

interface FormBuilderInterface {
    formFields: {
        type?: string;
        name?: string;
        label?: string;
        placeholder?: string;
    }[]
}

interface Model {
    name: string;
    label: string;
    value: string;
    error: string | null;
}

interface StatusResponse { response: { status: number; } }

interface AlertAppInterface {
    isOpen: boolean;
    isSuccess: boolean;
    message: string;
}

interface BaseProps {
    children: ReactNode;
    openAlert?: boolean; 
    isSuccess?: boolean; 
    messageAlert?: string;
    title: string;
}

interface MeAdaptInterface {
    name: string;
}

interface Card {
    image: string;
    title: string;
    subtitle: string;
    to: string;
}

interface DialogInterface {
    isOpen: boolean;
    title?: string;
    content?: string;
    func?: () => void;
    handleClose?: () => void;
}

interface BreadcrumbsInterface {
    options: {
        page: string; 
        current: boolean;
        href: string;
    }[]
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface EmployeesInterface {
    current_page: number;
    data: EmployeeInterface[];
    last_page: number;
    total: string;
}

interface EmployeeInterface {
    id: string;
    cod_funcionario: number;
    mes: string;
    funcionario: string;
    setor: string;
    funcao: string;
    categoria: string;
    categoria_bonus: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface DataEmployeeInterface {
    dataEmployee: {
        id: string;
        cod_funcionario: number;
        mes: string;
        funcionario: string;
        setor: string;
        funcao: string;
        categoria: string;
        categoria_bonus: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
    }
}

interface RowDrawerInterface {
    keyRow: string;
    value: string | number;
}

interface DataTableInterface {
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void; 
    rows: EmployeeInterface[]; 
    columns: GridColDef[]; 
    isLoading: boolean; 
    pages: number;
    hrefRegister: string;
    handleCurrentPage: (page: number) => void;
    title: string;
    monthFilter: boolean;
    funcMonthFilter: (e: SelectChangeEvent<string>) => void;
    valueMonthFilter: string;
}

interface RegisterEmployee {
    nome: string;
    chave: string;
    largura: number;
    altura: number;
    sarrafo: number;
}