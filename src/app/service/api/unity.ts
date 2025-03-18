import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function unities(page: number) {
    try {
        const response: { data: UnitiesInterface, status: number } = await axios.get(url+`/unity/?page=${page}`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        setCookie('statusMe', error.response.status);
        window.location.reload();
    }
}

export async function unityItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/unity-items/`, configAuth());
    return response.data;
}

export async function unity(id: string) {
    const response: { data: UnityInterface[], status: number } = await axios.get(url+`/unity/${id}/`, configAuth());
    return response.data;
}

export async function deleteUnity(id: string) {
    const response: { data: UnityInterface, status: number } = await axios.delete(url+`/unity/${id}/`, configAuth());
    return response;
}

export async function postUnity(nome: string) {
    const response: { data: UnityInterface[], status: number } = await axios.post(url+`/unity`, { nome }, configAuth());
    return response;
}

export async function putUnity(id: string, nome: string) {
    const response: { data: UnitiesInterface, status: number } = await axios.put(url+`/unity/${id}/`, { nome }, configAuth());
    return response;
}