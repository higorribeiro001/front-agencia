import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Bearer '+token, 
        // "ngrok-skip-browser-warning": true
    }}
}

export async function typeProducts(page: number) {
    try {
        const response: { data: TypeProductsInterface, status: number } = await axios.get(url+`tipo-produto/api/v1/?page=${page}`, configAuth());
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

export async function typeProductsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`tipo-produto/api/v1/itens/format/`, configAuth());
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

export async function typeProduct(id: string) {
    try {
        const response: { data: TypeProductInterface, status: number } = await axios.get(url+`tipo-produto/api/v1/${id}/`, configAuth());
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

export async function typeProductsFindByName(unity: string, name: string) {
    const response: { data: TypeProductsInterface, status: number } = await axios.get(url+`tipo-produto/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteTypeProduct(id: string) {
    const response: { data: TypeProductInterface, status: number } = await axios.delete(url+`tipo-produto/api/v1/${id}/`, configAuth());
    return response;
}

export async function postTypeProduct(dataTypeProduct: TypeProductRegisterInterface) {
    const response: { data: TypeProductInterface, status: number } = await axios.post(url+`tipo-produto/api/v1/`, dataTypeProduct, configAuth());
    return response;
}

export async function putTypeProduct(dataTypeProduct: TypeProductEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`tipo-produto/api/v1/${dataTypeProduct.id}/`, dataTypeProduct, configAuth());
    return response;
}