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

export async function earringDrops(page: number) {
    try {
        const response: { data: EarringDropsInterface, status: number } = await axios.get(url+`brinco/api/v1/baixa/brinco/?page=${page}`, configAuth());
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

export async function earringDropsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`brinco/api/v1/baixa/itens/format/`, configAuth());
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

export async function earringDrop(id: string) {
    try {
        const response: { data: EarringDropInterface, status: number } = await axios.get(url+`brinco/api/v1/baixa/brinco/${id}/`, configAuth());
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

export async function earringDropFindByName(unity: string, name: string) {
    const response: { data: EarringDropsInterface, status: number } = await axios.get(url+`brinco/api/v1/baixa/brinco/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteEarringDrop(id: string) {
    const response: { data: EarringDropInterface, status: number } = await axios.delete(url+`brinco/api/v1/baixa/brinco/${id}/`, configAuth());
    return response;
}

export async function postEarringDrop(dataEarring: EarringDropRegisterInterface) {
    const response: { data: EarringDropInterface, status: number } = await axios.post(url+`brinco/api/v1/baixa/brinco/`, dataEarring, configAuth());
    return response;
}

export async function putEarringDrop(dataEarring: EarringDropEditInterface) {
    const response: { data: EarringDropRegisterInterface, status: number } = await axios.put(url+`brinco/api/v1/baixa/brinco/${dataEarring.id}/`, dataEarring, configAuth());
    return response;
}