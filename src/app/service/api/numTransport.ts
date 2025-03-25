import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function numTransportItems() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`/num-transport-items/`, configAuth());
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

export async function numTransports(page: number) {
    try {
        const response: { data: NumTransportsInterface, status: number } = await axios.get(url+`/num-transport/?page=${page}`, configAuth());
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

export async function numTransport(id: string) {
    const response: { data: NumTransportInterface, status: number } = await axios.get(url+`/num-transport/${id}/`, configAuth());
    return response.data;
}

export async function numTransportFindByName(name: string) {
    const response: { data: NumTransportInterface[], status: number } = await axios.get(url+`/num-transport/${name}`, configAuth());
    return response.data;
}

export async function deleteNumTransport(id: string) {
    const response: { data: NumTransportInterface, status: number } = await axios.delete(url+`/num-transport/${id}/`, configAuth());
    return response;
}

export async function postNumTransport(dataNumTransport: RegisterInterface) {
    const {
        nome
    } = dataNumTransport;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/num-transport`, {
        nome
    }, configAuth());
    return response;
}

export async function putNumTransport(dataNumTransport: EditInterface) {
    const {
        id,
        nome
    } = dataNumTransport;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/num-transport/${id}/`, {
        nome
    }, configAuth());
    return response;
}
