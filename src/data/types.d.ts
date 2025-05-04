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
interface ErrorResponse { response: { status: number; data: { erro: string } } }

interface AlertAppInterface {
    isOpen: boolean;
    isSuccess: boolean;
    message: string;
}

interface BaseProps {
    window?: () => Window;
    children: ReactNode;
    openAlert?: boolean; 
    isSuccess?: boolean; 
    messageAlert?: string;
    title: string;
    uploadFile?: boolean;
    handleUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
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
    funcInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    funcRegister?: (e: ChangeEvent<HTMLInputElement>, id?: string) => void;
    valueInput?: string;
    errorInput?: string;
    handleClose?: () => void;
    isLoading?: boolean;
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
    next: string;
    results: OrderInterface[];
    previous: string;
    count: number;
}

interface OrderInterface {
    id: string;
    num_pedido: string;
    status: string;
    conforme: boolean;
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
        id: string;
        produto: string;
        un: string;
        qtd: number;
        valor_un: number;
        desconto: number;
        valor_total: number;
    }[];
    resultados: {
        id: number;
        total_qtd: number;
        total_qtd_m3: number;
        total_produtos: number;
        total_st: number;
        frete: number;
        desp_acess: number;
        desconto: number;
        total_ipi: number;
        total_pedido_venda: number;
    }[];
    condicoes_comerciais: {
        id: number;
        tipo_venda: string;
        conforme: string;
        forma_pagamento: string;
        qtd_parcelas: number;
        percentual_desconto: number;
        analise: {
            id: number;
            titulo: string;
            valor: string;
            aprovado: boolean;
        }[],
        percentual_frete: number;
    };
    registro_fotografico_empreendimento: string;
    observacoes: string;
    tipo_venda: string;
    forma_pagamento: string;
    endereco_entrega: string;
    prazo_entrega: string;
    info_produto: Array<string>;
    aprovado: boolean;
    responsavel_aprovacao: string;
    observacao: string;
}

interface DataOrderInterface {
    dataOrder: {
        id: string;
        num_pedido: string;
        status: string;
        conforme: boolean;
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
            id: string;
            produto: string;
            un: string;
            qtd: number;
            valor_un: number;
            desconto: number;
            valor_total: number;
        }[];
        resultados: 
        {
            id: number;
            total_qtd: number;
            total_qtd_m3: number;
            total_produtos: number;
            total_st: number;
            frete: number;
            desp_acess: number;
            desconto: number;
            total_ipi: number;
            total_pedido_venda: number;
        }[];
        condicoes_comerciais: {
            id: number;
            tipo_venda: string;
            conforme: string;
            forma_pagamento: string;
            qtd_parcelas: number;
            percentual_desconto: number;
            analise: {
                id: number;
                titulo: string;
                valor: string;
                aprovado: boolean;
            }[],
            percentual_frete: number;
        };
        registro_fotografico_empreendimento: string;
        observacoes: string;
        tipo_venda: string;
        forma_pagamento: string;
        endereco_entrega: string;
        prazo_entrega: string;
        info_produto: Array<string>;
        aprovado: boolean;
        observacao: string;
        responsavel_aprovacao: string;
    }
}

interface UnityInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface UnitiesInterface {
    current_page: number;
    data: UnityInterface[];
    last_page: number;
    total: string;
}

interface SellerInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface DataInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface DataDataInterface {
    dataData: DataInterface;
}

interface DatasInterface {
    current_page: number;
    data: DataInterface[];
    last_page: number;
    total: string;
}

interface RegisterInterface {
    nome: string;
}

interface EditInterface {
    id: string;
    nome: string;
}

interface DataSellerInterface {
    dataSeller: SellerInterface;
}

interface SellersInterface {
    current_page: number;
    data: SellerInterface[];
    last_page: number;
    total: string;
}

interface ClientInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface ClientsInterface {
    current_page: number;
    data: ClientInterface[];
    last_page: number;
    total: string;
}

interface CategoryInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface CategoriesInterface {
    current_page: number;
    data: CategoryInterface[];
    last_page: number;
    total: string;
}

interface RouteInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface RoutesInterface {
    current_page: number;
    data: RouteInterface[];
    last_page: number;
    total: string;
}

interface NumTransportInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface NumTransportsInterface {
    current_page: number;
    data: NumTransportInterface[];
    last_page: number;
    total: string;
}

interface PlateInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface PlatesInterface {
    current_page: number;
    data: PlateInterface[];
    last_page: number;
    total: string;
}

interface TypeVehicleInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface TypeVehiclesInterface {
    current_page: number;
    data: TypeVehicleInterface[];
    last_page: number;
    total: string;
}

interface DriverInterface {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface DriversInterface {
    current_page: number;
    data: DriverInterface[];
    last_page: number;
    total: string;
}

interface LogisticRegisterInterface {
    data: string;
    unidade_id: string;
    ov: string;
    nf: string;
    valor: number;
    vendedor_id: string;
    cliente_id: string;
    peso_kg: number;
    cidade: string;
    bairro: string;
    categoria_id: string;
    detalhamento: string;
    rota_id?: string;
    ordem_entrada?: number;
    num_transporte_id?: string;
    previsao_saida_carga?: string;
    placa_id?: string;
    tipo_veiculo_id?: string;
    status?: string;
    ocorrencia?: string;
    detalhamento_ocorrencia?: string;
    data_retorno_carga?: string;
    motorista_id?: string;
}

interface LogisticEditInterface {
    id: string;
    data: string;
    unidade_id: string;
    ov: string;
    nf: string;
    valor: number;
    vendedor_id: string;
    cliente_id: string;
    peso_kg: number;
    cidade: string;
    bairro: string;
    categoria_id: string;
    detalhamento: string;
    rota_id?: string;
    ordem_entrada?: number;
    num_transporte_id?: string;
    previsao_saida_carga?: string;
    placa_id?: string;
    tipo_veiculo_id?: string;
    status?: string;
    ocorrencia?: string;
    detalhamento_ocorrencia?: string;
    data_retorno_carga?: string;
    motorista_id?: string;
}

interface LogisticInterface {
    id: string;
    data: string;
    unidade_id: string;
    ov: string;
    nf: string;
    valor: number;
    vendedor_id: string;
    cliente_id: string;
    peso_kg: number;
    cidade: string;
    bairro: string;
    categoria_id: string;
    detalhamento: string;
    rota_id: string;
    ordem_entrada: number;
    num_transporte_id: string;
    previsao_saida_carga: string;
    placa_id: string;
    tipo_veiculo_id: string;
    status: string;
    ocorrencia: string;
    detalhamento_ocorrencia: string;
    data_retorno_carga: string;
    motorista_id: string;
    unidade: UnityInterface;
    vendedor: SellerInterface;
    cliente: ClientInterface;
    categoria: CategoryInterface;
    rota: RouteInterface;
    num_transporte: NumTransportInterface;
    placa: PlateInterface;
    tipo_veiculo: TypeVehicleInterface;
    motorista: DriverInterface;
}

interface LogisticsInterface {
    current_page: number;
    data: LogisticInterface[];
    last_page: number;
    total: string;
}

interface RowDrawerInterface {
    keyRow: string;
    value: string | number;
    color?: boolean;
    success?: boolean;
    approved?: boolean;
}

interface DataLogisticInterface {
    dataLogistic: LogisticInterface;
}

interface UserRegisterInterface {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
}

interface UserEditInterface {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    ativo: boolean;
}

interface ResetPasswordInterface {
    id: string;
    password: string;
}

interface UserInterface {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    image: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface UsersInterface {
    previous: number;
    results: UserInterface[];
    next: number;
    count: string;
}

interface DataUserInterface {
    dataUser: UserInterface;
}

interface DataTableInterface {
    handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void; 
    rows: Array<T>; 
    columns: GridColDef[]; 
    isLoading: boolean; 
    pages?: number;
    hrefRegister?: string;
    handleCurrentPage?: (page: number) => void;
    title: string;
    monthFilter?: boolean;
    funcMonthFilter?: (e: SelectChangeEvent<string>) => void;
    valueMonthFilter?: string;
    options?: {
        label: string;
        value: string;
    }
    according?: {
        label: string;
        value: string;
    };
    setAccording?: (value: {
        label: string;
        value: string;
    }) => void;
    funcOpenDialog?: () => void;
}

interface RowInfo {
    title: string;
    info: string;
    color?: boolean;
    success?: boolean;
    approved?: boolean;
}

interface FarmInterface {
    id?: string;
    fazenda: string;
    area_ha: string;
    qtd_animais: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface FarmRegisterInterface {
    fazenda: string;
    area_ha: string;
    qtd_animais: string;
}

interface FarmEditInterface {
    id: string;
    fazenda: string;
    area_ha: string;
    qtd_animais: string;
}

interface FarmsInterface {
    previous: number;
    results: FarmInterface[];
    next: number;
    count: string;
}

interface CochoInterface {
    id?: string;
    fazenda: FarmInterface;
    cocho: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface CochoRegisterInterface {
    fazenda: string;
    cocho: string;
}

interface CochoEditInterface {
    id: string;
    fazenda: string;
    cocho: string;
}

interface CochosInterface {
    previous: number;
    results: CochoInterface[];
    next: number;
    count: string;
}