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

interface EmployeeLabelInterface {
    label: string;
    value: string;
    error: string;
};

interface EmployeeInterface {
    id: string;
    cod_funcionario: number;
    mes: string;
    funcionario: string;
    setor: string;
    funcao: string;
    categoria: string;
    categoria_bonus: string;
    status: string;
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
        status: string;
        created_at: string;
        updated_at: string;
    }
}

interface DsssInterface {
    current_page: number;
    data: DssInterface[];
    last_page: number;
    total: string;
}

interface DssInterface {
    id: string;
    matricula: number;
    funcionario_id: string;
    data_realizacao: string;
    funcionario: {
        id: string;
        funcionario: string;
    };
    presenca: boolean;
    created_at: string;
    updated_at: string;
}

interface DataDssInterface {
    dataDss: {
        id: string;
        matricula: number;
        funcionario_id: string;
        data_realizacao: string;
        funcionario: {
            id: string;
            funcionario: string;
        };
        presenca: boolean;
        created_at: string;
        updated_at: string;
    }
}

// 

interface EpisInterface {
    current_page: number;
    data: EpiInterface[];
    last_page: number;
    total: string;
}

interface EpiInterface {
    id: string;
    matricula: number;
    funcionario_id: string;
    data_abordagem: string;
    funcionario: {
        id: string;
        funcionario: string;
    };
    conforme: boolean;
    created_at: string;
    updated_at: string;
}

interface DataEpiInterface {
    dataEpi: {
        id: string;
        matricula: number;
        funcionario_id: string;
        data_abordagem: string;
        funcionario: {
            id: string;
            funcionario: string;
        };
        conforme: boolean;
        created_at: string;
        updated_at: string;
    }
}

// 

interface AbsenseWarningsInterface {
    current_page: number;
    data: AbsenseWarningInterface[];
    last_page: number;
    total: string;
}

interface AbsenseWarningInterface {
    id: string;
    matricula: number;
    funcionario_id: string;
    mes: string;
    funcionario: {
        id: string;
        funcionario: string;
    };
    faltas: number;
    advertencias: number;
    created_at: string;
    updated_at: string;
}

interface DataAbsenseWarningInterface {
    dataAbsenseWarning: {
        id: string;
        matricula: number;
        funcionario_id: string;
        mes: string;
        funcionario: {
            id: string;
            funcionario: string;
        };
        faltas: number;
        advertencias: number;
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
    rows: Array<T>; 
    columns: GridColDef[]; 
    isLoading: boolean; 
    pages: number;
    hrefRegister: string;
    handleCurrentPage: (page: number) => void;
    title: string;
    monthFilter: boolean;
    funcMonthFilter: (e: SelectChangeEvent<string>) => void;
    valueMonthFilter: string;
    listDateDss: boolean;
    listDateEpi: boolean;
    listDateAbsenseWarning: boolean;
    handleSearchDss: (value: EmployeeLabelInterface) => void;
    handleSearchEpi: (value: EmployeeLabelInterface) => void;
    handleSearchAbsenseWarning: (value: EmployeeLabelInterface) => void;
}

interface RegisterEmployee {
    nome: string;
    chave: string;
    largura: number;
    altura: number;
    sarrafo: number;
}