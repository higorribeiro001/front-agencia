import { ChangeEvent } from react;

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

interface OrdersInterface {
    next: number;
    results: OrderInterface[];
    previous: number;
    count: string;
}

interface OrderInterface {
    id: string;
    num_pedido: string;
    status: string;
    cliente: string;
    fantasia: string;
    telefone: string;
    email: string;
    city: string;
    uf: string;
    cep: string;
    endereco: string;
    bairro: string;
    cpf_cnpj: string;
    inscricao_estadual: string;
    carga: string;
    representante: string;
    empresa: string;
    data_emissao: string;
    data_validade: string;
    previsao_embarque: string;
    ultima_entrega: string;
    dados_tabela:  {
        produto: string;
        un: string;
        qtd: number;
        valor_un: number;
        desconto: number;
        valor_total: number;
    }[];
    resultados: [
        {
            total_qtd: number;
            total_qtd_m3: number;
            total_produtos: number;
            total_st: number;
            frete: number;
            desp_acess: number;
            desconto: number;
            total_ipi: number;
            total_pedido_venda: number;
            valor_desconto_2_porc: number;
            valor_pos_6_meses_retirada: number;
            valor_frete: number;
            descontos_adicionais_p_kit: number
        }
    ];
    observacoes: string;
    tipo_venda: string;
    forma_pagamento: string;
    endereco_entrega: string;
    prazo_entrega: string;
    info_produto: Array<string>
}

interface DataOrderInterface {
    dataOrder: {
        id: string;
        num_pedido: string;
        status: string;
        cliente: string;
        fantasia: string;
        telefone: string;
        email: string;
        city: string;
        uf: string;
        cep: string;
        endereco: string;
        bairro: string;
        cpf_cnpj: string;
        inscricao_estadual: string;
        carga: string;
        representante: string;
        empresa: string;
        data_emissao: string;
        data_validade: string;
        previsao_embarque: string;
        ultima_entrega: string;
        dados_tabela:  {
            produto: string;
            un: string;
            qtd: number;
            valor_un: number;
            desconto: number;
            valor_total: number;
        }[];
        resultados: [
            {
                total_qtd: number;
                total_qtd_m3: number;
                total_produtos: number;
                total_st: number;
                frete: number;
                desp_acess: number;
                desconto: number;
                total_ipi: number;
                total_pedido_venda: number;
                valor_desconto_2_porc: number;
                valor_pos_6_meses_retirada: number;
                valor_frete: number;
                descontos_adicionais_p_kit: number
            }
        ];
        observacoes: string;
        tipo_venda: string;
        forma_pagamento: string;
        endereco_entrega: string;
        prazo_entrega: string;
        info_produto: Array<string>
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
    listDateOrder: boolean;
    listDateEpi: boolean;
    listDateAbsenseWarning: boolean;
    handleSearchOrder: (value: EmployeeLabelInterface) => void;
    handleSearchEpi: (value: EmployeeLabelInterface) => void;
    handleSearchAbsenseWarning: (value: EmployeeLabelInterface) => void;
}