import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Bearer '+token, 
        "ngrok-skip-browser-warning": true
    }}
}

export async function outputProducts(page: number) {
    try {
        const response: { data: OutputProductsInterface, status: number } = await axios.get(url+`produto/api/v1/estoque/saida/?page=${page}`, configAuth());
        return response;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        if (error.response.status === 401) {
            deleteCookie('access');
            setCookie('statusMe', error.response.status);
            window.location.reload();
        }
    }
}

export async function outputProductsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`produto/api/v1/estoque/saida/itens/format/`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        if (error.response.status === 401) {
            deleteCookie('access');
            setCookie('statusMe', error.response.status);
            window.location.reload();
        }
    }
}

export async function outputProduct(id: string) {
    try {
        const response: { data: OutputProductInterface, status: number } = await axios.get(url+`produto/api/v1/estoque/saida/${id}/`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        if (error.response.status === 401) {
            deleteCookie('access');
            setCookie('statusMe', error.response.status);
            window.location.reload();
        }
    }
}

export async function outputProductFindByName(unity: string, name: string) {
    const response: { data: OutputProductsInterface, status: number } = await axios.get(url+`produto/api/v1/estoque/saida/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteOutputProduct(id: string) {
    const response: { data: OutputProductInterface, status: number } = await axios.delete(url+`produto/api/v1/estoque/saida/${id}/`, configAuth());
    return response;
}

export async function postOutputProduct(dataOutputProduct: OutputProductRegisterInterface) {
    const response: { data: OutputProductInterface, status: number } = await axios.post(url+`produto/api/v1/estoque/saida/`, dataOutputProduct, configAuth());
    return response;
}

export async function putOutputProduct(dataOutputProduct: OutputProductEditInterface) {
    const response: { data: OutputProductRegisterInterface, status: number } = await axios.put(url+`produto/api/v1/estoque/saida/${dataOutputProduct.id}/`, dataOutputProduct, configAuth());
    return response;
}