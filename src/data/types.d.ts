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

interface MdfDoorLeavesInterface {
    current_page: number;
    data: {
        id: string;
        nome: string;
        chave: string;
        largura: number;
        altura: number;
        sarrafo: number;
        mdf_30: number;
        mdf_6_comum_2_qualidade: number;
        mdf_3_comum_1_qualidade: number;
        mdf_3_comum_2_qualidade: number;
        mdf_3_berneck: number;
        madeira: number;
        bondoor: number;
        total_mdf_m: number;
        total_mdf_m2_rec: number;
        total_mdf_m2_pintura: number;
        total_mdf_m3: number;
        created_at: string;
        updated_at: string;
    }[];
    last_page: number;
    total: string;
}

interface MdfDoorLeaveInterface {
    id: string;
    nome: string;
    chave: string;
    largura: number;
    altura: number;
    sarrafo: number;
    mdf_30: number;
    mdf_6_comum_2_qualidade: number;
    mdf_3_comum_1_qualidade: number;
    mdf_3_comum_2_qualidade: number;
    mdf_3_berneck: number;
    madeira: number;
    bondoor: number;
    total_mdf_m: number;
    total_mdf_m2_rec: number;
    total_mdf_m2_pintura: number;
    total_mdf_m3: number;
    created_at: string;
    updated_at: string;
    created_at: string;
    updated_at: string;
}

interface DataMdfDoorLeaveInterface {
    dataMdfDoorLeave: {
        id: string;
        nome: string;
        chave: string;
        largura: number;
        altura: number;
        sarrafo: number;
        mdf_30: number;
        mdf_6_comum_2_qualidade: number;
        mdf_3_comum_1_qualidade: number;
        mdf_3_comum_2_qualidade: number;
        mdf_3_berneck: number;
        madeira: number;
        bondoor: number;
        total_mdf_m: number;
        total_mdf_m2_rec: number;
        total_mdf_m2_pintura: number;
        total_mdf_m3: number;
        created_at: string;
        updated_at: string;
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
    rows: MdfDoorLeaveInterface[]; 
    columns: GridColDef[]; 
    isLoading: boolean; 
    pages: number;
    hrefRegister: string;
    handleCurrentPage: (page: number) => void;
}

interface RegisterMdfDoorLeave {
    nome: string;
    chave: string;
    largura: number;
    altura: number;
    sarrafo: number;
}