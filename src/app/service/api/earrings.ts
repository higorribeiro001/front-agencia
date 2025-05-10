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

export async function earrings(page: number) {
    try {
        const response: { data: EarringsInterface, status: number } = await axios.get(url+`brinco/api/v1/?page=${page}`, configAuth());
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

export async function earringsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`brinco/api/v1/itens/format/`, configAuth());
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

export async function earring(id: string) {
    try {
        const response: { data: EarringInterface, status: number } = await axios.get(url+`brinco/api/v1/${id}/`, configAuth());
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

export async function earringFindByName(unity: string, name: string) {
    const response: { data: EarringsInterface, status: number } = await axios.get(url+`brinco/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteEarring(id: string) {
    const response: { data: EarringInterface, status: number } = await axios.delete(url+`brinco/api/v1/${id}/`, configAuth());
    return response;
}

export async function postEarring(dataEarring: EarringRegisterInterface) {
    const response: { data: EarringInterface, status: number } = await axios.post(url+`brinco/api/v1/`, dataEarring, configAuth());
    return response;
}

export async function putEarring(dataEarring: EarringEditInterface) {
    const response: { data: EarringRegisterInterface, status: number } = await axios.put(url+`brinco/api/v1/${dataEarring.id}/`, dataEarring, configAuth());
    return response;
}