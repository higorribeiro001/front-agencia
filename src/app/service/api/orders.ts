import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function orders(page: number) {
    try {
        const response: { data: OrdersInterface, status: number } = await axios.get(url+`/v1/pedidos/?page=${page}`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        setCookie('statusMe', error.response.status);
        window.location.reload();
    }
}

export async function order(id: string) {
    const response: { data: OrderInterface, status: number } = await axios.get(url+`/v1/pedidos/${id}/`, configAuth());
    return response.data;
}

export async function orderItem(num_pedido: string) {
    const response: { data: OrdersInterface, status: number } = await axios.get(url+`/v1/pedidos/itens/${num_pedido}/`, configAuth());
    return response.data;
}

export async function orderAccordingItem(conforme: boolean) {
    const response: { data: OrdersInterface, status: number } = await axios.get(url+`/v1/pedidos/itens/filtro/conforme/?conforme=${conforme}`, configAuth());
    return response.data;
}

export async function uploadPhotoItem(num_pedido: string, formData: FormData) {
    const response: { data: OrderInterface, status: number } = await axios.post(url+`/v1/pedidos/itens/${num_pedido}/`, formData, configAuth());
    return response;
}

export async function orderApproved(num_pedido: string, id_analise: number, aprovado: boolean) {
    const response: { data: OrderInterface, status: number } = await axios.patch(url+`/v1/pedidos/itens/${num_pedido}/`, {id_analise, aprovado}, configAuth());
    return response;
}

export async function deleteOrder(id: string) {
    const response: { data: OrderInterface, status: number } = await axios.delete(url+`/v1/pedidos/${id}/`, configAuth());
    return response;
}

export async function postOrder(formData: FormData) {
    const response: { data: OrderInterface[], status: number } = await axios.post(url+`/v1/pedidos/`, formData, configAuth());
    return response;
}

export async function putOrder(id: string, num_pedido: string, cliente: string, fantasia: string, empresa: string, cpf_cnpj: string, telefone: string, email: string, cep: string, endereco: string, bairro: string, city: string, uf: string, inscricao_estadual: string, representante: string, status: string, conforme: boolean, carga: string, data_emissao: string, data_validade: string, previsao_embarque: string, ultima_entrega: string, tipo_venda: string, forma_pagamento: string, endereco_entrega: string, prazo_entrega: string) {
    const response: { data: OrdersInterface, status: number } = await axios.put(url+`/v1/pedidos/${id}/`, {num_pedido, cliente, fantasia, empresa, cpf_cnpj, telefone, email, cep, endereco, bairro, city, uf, inscricao_estadual, representante, status, conforme, carga, data_emissao, data_validade, previsao_embarque, ultima_entrega, tipo_venda, forma_pagamento, endereco_entrega, prazo_entrega}, configAuth());
    return response;
}