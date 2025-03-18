import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function logistics(page: number, unidade_id: string) {
    try {
        const response: { data: LogisticsInterface, status: number } = await axios.get(url+`/logistics/${unidade_id}/?page=${page}`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        setCookie('statusMe', error.response.status);
        window.location.reload();
    }
}

export async function logistic(id: string) {
    const response: { data: LogisticInterface, status: number } = await axios.get(url+`/logistics/${id}/`, configAuth());
    return response.data;
}

export async function deleteLogistic(id: string) {
    const response: { data: LogisticInterface, status: number } = await axios.delete(url+`/logistics/${id}/`, configAuth());
    return response;
}

export async function postLogistic(dataLogistic: LogisticRegisterInterface) {
    const {
        data,
        unidade_id,
        ov,
        nf,
        valor,
        vendedor_id,
        cliente_id,
        peso_kg,
        cidade,
        bairro,
        categoria_id,
        detalhamento,
        rota_id,
        ordem_entrada,
        num_transporte_id,
        previsao_saida_carga,
        placa_id,
        tipo_veiculo_id,
        status,
        ocorrencia,
        detalhamento_ocorrencia,
        data_retorno_carga,
        motorista_id,
    } = dataLogistic;
    const response: { data: LogisticRegisterInterface, status: number } = await axios.post(url+`/logistics`, {
        data,
        unidade_id,
        ov,
        nf,
        valor,
        vendedor_id,
        cliente_id,
        peso_kg,
        cidade,
        bairro,
        categoria_id,
        detalhamento,
        rota_id,
        ordem_entrada,
        num_transporte_id,
        previsao_saida_carga,
        placa_id,
        tipo_veiculo_id,
        status,
        ocorrencia,
        detalhamento_ocorrencia,
        data_retorno_carga,
        motorista_id,
    }, configAuth());
    return response;
}

export async function putLogistic(id: string, nome: string) {
    const response: { data: LogisticInterface, status: number } = await axios.put(url+`/logistics/${id}/`, { nome }, configAuth());
    return response;
}