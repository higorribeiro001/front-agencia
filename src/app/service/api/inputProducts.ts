import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Bearer '+token, 
        // "ngrok-skip-browser-warning": "69420"
    }}
}

export async function inputProducts(page: number) {
    try {
        const response: { data: InputProductsInterface, status: number } = await axios.get(url+`produto/api/v1/estoque/entrada/?page=${page}`, configAuth());
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

export async function inputProductsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`produto/api/v1/estoque/entrada/itens/format/`, configAuth());
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

export async function inputProduct(id: string) {
    try {
        const response: { data: InputProductInterface, status: number } = await axios.get(url+`produto/api/v1/estoque/entrada/${id}/`, configAuth());
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

export async function inputProductFindByName(unity: string, name: string) {
    const response: { data: InputProductsInterface, status: number } = await axios.get(url+`produto/api/v1/estoque/entrada/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteInputProduct(id: string) {
    const response: { data: InputProductInterface, status: number } = await axios.delete(url+`produto/api/v1/estoque/entrada/${id}/`, configAuth());
    return response;
}

export async function postInputProduct(dataInputProduct: InputProductRegisterInterface) {
    const response: { data: InputProductInterface, status: number } = await axios.post(url+`produto/api/v1/estoque/entrada/`, dataInputProduct, configAuth());
    return response;
}

export async function putInputProduct(dataInputProduct: InputProductEditInterface) {
    const response: { data: InputProductRegisterInterface, status: number } = await axios.put(url+`produto/api/v1/estoque/entrada/${dataInputProduct.id}/`, dataInputProduct, configAuth());
    return response;
}