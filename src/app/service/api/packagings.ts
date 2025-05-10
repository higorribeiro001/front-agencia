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

export async function packagings(page: number) {
    try {
        const response: { data: PackagingsInterface, status: number } = await axios.get(url+`embalagem/api/v1/?page=${page}`, configAuth());
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

export async function packagingsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`embalagem/api/v1/itens/format/`, configAuth());
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

export async function packaging(id: string) {
    try {
        const response: { data: PackagingInterface, status: number } = await axios.get(url+`embalagem/api/v1/${id}/`, configAuth());
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

export async function packagingsFindByName(unity: string, name: string) {
    const response: { data: PackagingsInterface, status: number } = await axios.get(url+`embalagem/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deletePackaging(id: string) {
    const response: { data: PackagingInterface, status: number } = await axios.delete(url+`embalagem/api/v1/${id}/`, configAuth());
    return response;
}

export async function postPackaging(dataPackaging: PackagingRegisterInterface) {
    const response: { data: PackagingInterface, status: number } = await axios.post(url+`embalagem/api/v1/`, dataPackaging, configAuth());
    return response;
}

export async function putPackaging(dataPackaging: PackagingEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`embalagem/api/v1/${dataPackaging.id}/`, dataPackaging, configAuth());
    return response;
}