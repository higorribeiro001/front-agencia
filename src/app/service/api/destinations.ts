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

export async function destinations(page: number) {
    try {
        const response: { data: DestinationsInterface, status: number } = await axios.get(url+`destino/api/v1/?page=${page}`, configAuth());
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

export async function destinationsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`destino/api/v1/itens/format/`, configAuth());
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

export async function destination(id: string) {
    try {
        const response: { data: DestinationInterface, status: number } = await axios.get(url+`destino/api/v1/${id}/`, configAuth());
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

export async function destinationFindByName(unity: string, name: string) {
    const response: { data: DestinationsInterface, status: number } = await axios.get(url+`destino/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteDestination(id: string) {
    const response: { data: DestinationInterface, status: number } = await axios.delete(url+`destino/api/v1/${id}/`, configAuth());
    return response;
}

export async function postDestination(dataDestination: DestinationRegisterInterface) {
    const response: { data: DestinationInterface, status: number } = await axios.post(url+`destino/api/v1/`, dataDestination, configAuth());
    return response;
}

export async function putDestination(dataDestination: DestinationEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`destino/api/v1/${dataDestination.id}/`, dataDestination, configAuth());
    return response;
}