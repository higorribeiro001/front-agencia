import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token, "ngrok-skip-browser-warning": "69420"}}
}

export async function clientItems() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`/client-items/`, configAuth());
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

export async function clients(page: number) {
    try {
        const response: { data: ClientsInterface, status: number } = await axios.get(url+`/client/?page=${page}`, configAuth());
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

export async function client(id: string) {
    try {
        const response: { data: ClientInterface, status: number } = await axios.get(url+`/client/${id}/`, configAuth());
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

export async function clientFindByName(name: string) {
    const response: { data: DataInterface[], status: number } = await axios.get(url+`/client/${name}`, configAuth());
    return response.data;
}

export async function deleteClient(id: string) {
    const response: { data: ClientInterface, status: number } = await axios.delete(url+`/client/${id}/`, configAuth());
    return response;
}

export async function postClient(dataClient: RegisterInterface) {
    const {
        nome
    } = dataClient;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/client`, {
        nome
    }, configAuth());
    return response;
}

export async function putClient(dataClient: EditInterface) {
    const {
        id,
        nome
    } = dataClient;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/client/${id}/`, {
        nome
    }, configAuth());
    return response;
}
