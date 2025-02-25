import axios from 'axios';
// import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
// const configAuth = () => {
//     const token = getCookie('access');
//     return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
// }

export async function orders(page: number) {
    try {
        const response: { data: OrdersInterface, status: number } = await axios.get(url+`/v1/pedidos/?page=${page}`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}

export async function order(id: string) {
    const response: { data: OrderInterface, status: number } = await axios.get(url+`/v1/pedidos/${id}/`);
    return response.data;
}

export async function deleteOrder(id: string) {
    const response: { data: OrderInterface, status: number } = await axios.delete(url+`/v1/pedidos/${id}/`);
    return response;
}

export async function postOrder(formData: FormData) {
    const response: { data: OrderInterface, status: number } = await axios.post(url+`/v1/pedidos/`, formData);
    return response;
}

export async function putOrder(id: string, matricula: number, funcionario_id: string, presenca: boolean, data_realizacao: string) {
    const response: { data: OrdersInterface, status: number } = await axios.put(url+`/v1/pedidos/${id}/`, {matricula, funcionario_id, presenca, data_realizacao});
    return response;
}