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

export async function weighings(page: number) {
    try {
        const response: { data: WeighingsInterface, status: number } = await axios.get(url+`pesagens/api/v1/?page=${page}`, configAuth());
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

export async function weighingsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`pesagens/api/v1/itens/format/`, configAuth());
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

export async function weighing(id: string) {
    try {
        const response: { data: WeighingInterface, status: number } = await axios.get(url+`pesagens/api/v1/${id}/`, configAuth());
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

export async function weighingFindByName(unity: string, name: string) {
    const response: { data: WeighingsInterface, status: number } = await axios.get(url+`pesagens/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteWeighing(id: string) {
    const response: { data: WeighingInterface, status: number } = await axios.delete(url+`pesagens/api/v1/${id}/`, configAuth());
    return response;
}

export async function postWeighing(dataWeighing: WeighingRegisterInterface) {
    const response: { data: WeighingInterface, status: number } = await axios.post(url+`pesagens/api/v1/`, dataWeighing, configAuth());
    return response;
}

export async function putWeighing(dataWeighing: WeighingEditInterface) {
    const response: { data: WeighingRegisterInterface, status: number } = await axios.put(url+`pesagens/api/v1/${dataWeighing.id}/`, dataWeighing, configAuth());
    return response;
}