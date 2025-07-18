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

interface SidebarInterface { icon: React.ReactElement; title: string; to: string; childs?: SidebarInterface[] }

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

interface ApplicationPhaseInterface {
    id?: string;
    fase_aplicacao: string;
    link: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface ApplicationPhaseRegisterInterface {
    fase_aplicacao: string;
}

interface ApplicationPhaseEditInterface {
    id: string;
    fase_aplicacao: string;
}

interface ApplicationPhasesInterface {
    previous: number;
    results: ApplicationPhaseInterface[];
    next: number;
    count: string;
}

interface SupplierInterface {
    id?: string;
    fornecedor: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface SupplierRegisterInterface {
    fornecedor: string;
}

interface SupplierEditInterface {
    id: string;
    fornecedor: string;
}

interface SuppliersInterface {
    previous: number;
    results: SupplierInterface[];
    next: number;
    count: string;
}

interface PackagingInterface {
    id?: string;
    un: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface PackagingRegisterInterface {
    un: string;
}

interface PackagingEditInterface {
    id: string;
    un: string;
}

interface PackagingsInterface {
    previous: number;
    results: PackagingInterface[];
    next: number;
    count: string;
}

interface TypeProductInterface {
    id?: string;
    tipo: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface TypeProductRegisterInterface {
    tipo: string;
}

interface TypeProductEditInterface {
    id: string;
    tipo: string;
}

interface TypeProductsInterface {
    previous: number;
    results: TypeProductInterface[];
    next: number;
    count: string;
}

interface ProductInterface {
    id: string;
    tipo: TypeProductInterface;
    insumo: string;    
    destino: DestinationInterface;
    data_criacao?: string;
    data_edicao?: string;
}

interface ProductRegisterInterface {
    tipo: string;
    insumo: string;    
    destino: string;
}

interface ProductEditInterface {
    id: string;
    tipo: string;
    insumo: string;    
    destino: string;
}

interface ProductsInterface {
    previous: number;
    results: ProductInterface[];
    next: number;
    count: string;
}

interface ChartAccountInterface {
    id: string;
    // id_contas: string;    
    tipo: string;
    grupo: string;
    descricao: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface ChartAccountRegisterInterface {
    // id_contas: string;    
    tipo: string;
    grupo: string;
    descricao: string;
}

interface ChartAccountEditInterface {
    id: string;
    // id_contas: string;    
    tipo: string;
    grupo: string;
    descricao: string;
}

interface ChartAccountsInterface {
    previous: number;
    results: ChartAccountInterface[];
    next: number;
    count: string;
}

interface EarringInterface {
    id: string;
    brinco: string;
    proprietario: OwnerInterface;
    fazenda: FarmInterface;  
    lote: string;
    sexo: string;
    raca: string;
    data_entrada: string;
    valor_entrada: number;
    kg_entrada: number;
    perda_dados: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface EarringRegisterInterface {
    brinco: string;
    proprietario: string;
    fazenda: string;  
    lote: string;
    sexo: string;
    raca: string;
    data_entrada: string;
    valor_entrada: number;
    kg_entrada: number;
    perda_dados: string;
}

interface EarringEditInterface {
    id: string;
    brinco: string;
    proprietario: string;
    fazenda: string;  
    lote: string;
    sexo: string;
    raca: string;
    data_entrada: string;
    valor_entrada: number;
    kg_entrada: number;
    perda_dados: string;
}

interface EarringsInterface {
    previous: number;
    results: EarringInterface[];
    next: number;
    count: string;
}

interface OwnerInterface {
    id: string;
    proprietario: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface OwnerRegisterInterface {
    proprietario: string;
}

interface OwnerEditInterface {
    id: string;
    proprietario: string;
}

interface OwnersInterface {
    previous: number;
    results: OwnerInterface[];
    next: number;
    count: string;
}

interface EarringDropInterface {
    id: string;
    brinco: EarringInterface;
    data: string;
    fazenda: FarmInterface;  
    lote: string;
    motivo_baixa: string;
    descricao: string;
    kg_saida: string;
    valor_saida: number;
    data_criacao?: string;
    data_edicao?: string;
}

interface EarringDropRegisterInterface {
    brinco: string;
    data: string;
    fazenda: string;  
    lote: string;
    motivo_baixa: string;
    descricao: string;
    kg_saida: string;
    valor_saida: number;
}

interface EarringDropEditInterface {
    id: string;
    brinco: string;
    data: string;
    fazenda: string;  
    lote: string;
    motivo_baixa: string;
    descricao: string;
    kg_saida: string;
    valor_saida: number;
}

interface EarringDropsInterface {
    previous: number;
    results: EarringDropInterface[];
    next: number;
    count: string;
}

interface InputProductInterface {
    id: string;
    fornecedor: SupplierInterface;
    n_nf: number;
    produto: ProductInterface;  
    lote: string;
    un: string;
    qtd: number;
    total: number;
    valor_unitario: number;
    data_vencimento: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface InputProductRegisterInterface {
    fornecedor: string;
    n_nf: number;
    produto: string;  
    lote: string;
    un: string;
    qtd: number;
    total: number;
    valor_unitario: number;
    data_vencimento: string;
}

interface InputProductEditInterface {
    id: string;
    fornecedor: string;
    n_nf: number;
    produto: string;  
    lote: string;
    un: string;
    qtd: number;
    total: number;
    valor_unitario: number;
    data_vencimento: string;
}

interface InputProductsInterface {
    previous: number;
    results: InputProductInterface[];
    next: number;
    count: string;
}

interface OutputProductInterface {
    id: string;
    data_movimentacao: string;
    fazenda: FarmInterface;
    produto: ProductInterface;  
    fase_aplicacao: ApplicationPhaseInterface;
    hectares: string;
    lote: string;
    total_aplicacao: number;
    data_criacao?: string;
    data_edicao?: string;
}

interface OutputProductRegisterInterface {
    data_movimentacao: string;
    fazenda: string;
    produto: string;  
    fase_aplicacao: string;
    hectares: string;
    lote: string;
    total_aplicacao: number;
}

interface OutputProductEditInterface {
    id: string;
    data_movimentacao: string;
    fazenda: string;
    produto: string;  
    fase_aplicacao: string;
    hectares: string;
    lote: string;
    total_aplicacao: number;
}

interface OutputProductsInterface {
    previous: number;
    results: OutputProductInterface[];
    next: number;
    count: string;
}

interface DestinationInterface {
    id: string;
    destino: string;
    data_criacao?: string;
    data_edicao?: string;
}

interface DestinationRegisterInterface {
    destino: string;
}

interface DestinationEditInterface {
    id: string;
    destino: string;
}

interface DestinationsInterface {
    previous: number;
    results: DestinationInterface[];
    next: number;
    count: string;
}

interface RevenueInterface {
    id: string;
    data_registro: string;
    fazenda: FarmInterface;
    conta: ChartAccountInterface;
    nota_fiscal: string;
    descricao: string;
    numero_boleto: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_recebido: number;
    valor_total: number;
    data_criacao?: string;
    data_edicao?: string;
}

interface RevenueRegisterInterface {
    data_registro: string;
    fazenda: string;
    conta: string;
    nota_fiscal: string;
    descricao: string;
    numero_boleto: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_recebido: number;
    valor_total: number;
}

interface RevenueEditInterface {
    id: string;
    data_registro: string;
    fazenda: string;
    conta: string;
    nota_fiscal: string;
    descricao: string;
    numero_boleto: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_recebido: number;
    valor_total: number;
}

interface RevenuesInterface {
    previous: number;
    results: RevenueInterface[];
    next: number;
    count: string;
}

interface ExpenseInterface {
    id: string;
    data_registro: string;
    fazenda: FarmInterface;
    conta: ChartAccountInterface;
    nota_fiscal: string;
    descricao: string;
    observacao: string;
    numero_boleto: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_total: number;
    valor_pago: number;
    data_criacao?: string;
    data_edicao?: string;
}

interface ExpenseRegisterInterface {
    data_registro: string;
    fazenda: string;
    conta: string;
    nota_fiscal: string;
    descricao: string;
    observacao: string;
    numero_boleto: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_total: number;
    valor_pago: number;
}

interface ExpenseEditInterface {
    id: string;
    data_registro: string;
    fazenda: string;
    conta: string;
    nota_fiscal: string;
    descricao: string;
    observacao: string;
    numero_boleto: string;
    data_vencimento: string;
    data_pagamento: string;
    valor_total: number;
    valor_pago: number;
}

interface ExpensesInterface {
    previous: number;
    results: ExpenseInterface[];
    next: number;
    count: string;
}

interface WeighingInterface {
    id: string;
    data_pesagem: string;
    fazenda: FarmInterface;  
    total_kg: number;
    qtd_bois: number;
    valor: number;
    data_criacao?: string;
    data_edicao?: string;
}

interface WeighingRegisterInterface {
    data_pesagem: string;
    fazenda: string;  
    total_kg: number;
    qtd_bois: number;
    valor: number;
}

interface WeighingEditInterface {
    id: string;
    data_pesagem: string;
    fazenda: string;  
    total_kg: number;
    qtd_bois: number;
    valor: number;
}

interface WeighingsInterface {
    previous: number;
    results: WeighingInterface[];
    next: number;
    count: string;
}

interface ColumnSearchTripInterface {
    label: string;
    typeInput: string;
    value?: Model;
    setValue?: (value: Model) => void;
}

interface GeoInterface {
    lat: number;
    lng: number;
}

interface ResponseGeo {
    data: GeoInterface;
    status: number;
}

interface Trip {
    id?: string;
    titulo: string;
    descricao: string;
    dias: number;
    valor: number;
    avaliacao: number;
    latitude: number;
    longitude: number;
    data: string;
    vagas: number;
    FotoViagems?: ImageTrip[]
}

interface ImageTrip {
    filename: string;
    url: string;
}