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

export async function suppliers(page: number) {
    try {
        const response: { data: SuppliersInterface, status: number } = await axios.get(url+`fornecedor/api/v1/?page=${page}`, configAuth());
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

export async function suppliersFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`fornecedor/api/v1/itens/format/`, configAuth());
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

export async function supplier(id: string) {
    try {
        const response: { data: SupplierInterface, status: number } = await axios.get(url+`fornecedor/api/v1/${id}/`, configAuth());
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

export async function suppliersFindByName(unity: string, name: string) {
    const response: { data: SuppliersInterface, status: number } = await axios.get(url+`fornecedor/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteSupplier(id: string) {
    const response: { data: SupplierInterface, status: number } = await axios.delete(url+`fornecedor/api/v1/${id}/`, configAuth());
    return response;
}

export async function postSupplier(dataSupplier: SupplierRegisterInterface) {
    const response: { data: SupplierInterface, status: number } = await axios.post(url+`fornecedor/api/v1/`, dataSupplier, configAuth());
    return response;
}

export async function putSupplier(dataSupplier: SupplierEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`fornecedor/api/v1/${dataSupplier.id}/`, dataSupplier, configAuth());
    return response;
}