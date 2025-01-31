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

interface AlertApp {
    isOpen: boolean;
    isSuccess: boolean;
    message: string;
}

interface BaseProps {
    children: ReactNode;
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

interface Dialog {
    isOpen: boolean;
    title: string;
    content: string;
    func: () => void;
    handleClose: () => void;
}

interface Breadcrumbs {
    options: {
        page: string; 
        current: boolean;
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
}