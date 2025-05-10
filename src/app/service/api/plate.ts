import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token, "ngrok-skip-browser-warning": "69420"}}
}

export async function plateItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/plate-items/`, configAuth());
    return response.data;
}

export async function plates(page: number) {
    try {
        const response: { data: PlatesInterface, status: number } = await axios.get(url+`/plate/?page=${page}`, configAuth());
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

export async function plate(id: string) {
    try {
        const response: { data: PlateInterface, status: number } = await axios.get(url+`/plate/${id}/`, configAuth());
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

export async function plateFindByName(name: string) {
    const response: { data: PlateInterface[], status: number } = await axios.get(url+`/plate/${name}`, configAuth());
    return response.data;
}

export async function deletePlate(id: string) {
    const response: { data: PlateInterface, status: number } = await axios.delete(url+`/plate/${id}/`, configAuth());
    return response;
}

export async function postPlate(dataPlate: RegisterInterface) {
    const {
        nome
    } = dataPlate;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/plate`, {
        nome
    }, configAuth());
    return response;
}

export async function putPlate(dataPlate: EditInterface) {
    const {
        id,
        nome
    } = dataPlate;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/plate/${id}/`, {
        nome
    }, configAuth());
    return response;
}

