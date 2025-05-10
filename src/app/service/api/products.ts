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

export async function products(page: number) {
    try {
        const response: { data: ProductsInterface, status: number } = await axios.get(url+`produto/api/v1/?page=${page}`, configAuth());
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

export async function productsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`produto/api/v1/itens/format/`, configAuth());
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

export async function product(id: string) {
    try {
        const response: { data: ProductInterface, status: number } = await axios.get(url+`produto/api/v1/${id}/`, configAuth());
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

export async function productFindByName(unity: string, name: string) {
    const response: { data: ProductsInterface, status: number } = await axios.get(url+`produto/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteProduct(id: string) {
    const response: { data: ProductInterface, status: number } = await axios.delete(url+`produto/api/v1/${id}/`, configAuth());
    return response;
}

export async function postProduct(dataProduct: ProductRegisterInterface) {
    const response: { data: ProductInterface, status: number } = await axios.post(url+`produto/api/v1/`, dataProduct, configAuth());
    return response;
}

export async function putProduct(dataProduct: ProductEditInterface) {
    const response: { data: ProductRegisterInterface, status: number } = await axios.put(url+`produto/api/v1/${dataProduct.id}/`, dataProduct, configAuth());
    return response;
}