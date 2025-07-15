import axios from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    return {
        withCredentials: true,
        headers: { 
        'Accept': 'application/json', 
        // "ngrok-skip-browser-warning": true
    }}
}

export async function trips() {
    try {
        const response: { data: Trip[], status: number } = await axios.get(url+`/api/v1/viagens/`, configAuth());
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

export async function trip(id: string) {
    try {
        const response: { data: Trip, status: number } = await axios.get(url+`/api/v1/viagens/${id}/`, configAuth());
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

export async function deleteTrip(id: string) {
    const response: { data: Trip, status: number } = await axios.delete(url+`/api/v1/viagens/${id}/`, configAuth());
    return response;
}

export async function postTrip(dataTrip: Trip) {
    const response: { data: Trip, status: number } = await axios.post(url+`/api/v1/viagens/`, dataTrip, configAuth());
    return response;
}

export async function putTrip(dataTrip: Trip) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`/api/v1/viagens/${dataTrip.id}/`, dataTrip, configAuth());
    return response;
}