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

export async function cochos(page: number) {
    try {
        const response: { data: CochosInterface, status: number } = await axios.get(url+`cocho/api/v1/?page=${page}`, configAuth());
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

export async function cochosFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`cocho/api/v1/itens/format/`, configAuth());
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

export async function cocho(id: string) {
    try {
        const response: { data: CochoInterface, status: number } = await axios.get(url+`cocho/api/v1/${id}/`, configAuth());
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

export async function cochoFindByName(unity: string, name: string) {
    const response: { data: CochosInterface, status: number } = await axios.get(url+`cocho/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteCocho(id: string) {
    const response: { data: CochoInterface, status: number } = await axios.delete(url+`cocho/api/v1/${id}/`, configAuth());
    return response;
}

export async function postCocho(dataCocho: CochoRegisterInterface) {
    const response: { data: CochoInterface, status: number } = await axios.post(url+`cocho/api/v1/`, dataCocho, configAuth());
    return response;
}

export async function putCocho(dataCocho: CochoEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`cocho/api/v1/${dataCocho.id}/`, dataCocho, configAuth());
    return response;
}