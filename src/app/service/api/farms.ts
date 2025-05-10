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

export async function farms(page: number) {
    try {
        const response: { data: FarmsInterface, status: number } = await axios.get(url+`fazenda/api/v1/?page=${page}`, configAuth());
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

export async function farmsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`fazenda/api/v1/itens/format/`, configAuth());
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

export async function farm(id: string) {
    try {
        const response: { data: FarmInterface, status: number } = await axios.get(url+`fazenda/api/v1/${id}/`, configAuth());
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

export async function farmFindByName(unity: string, name: string) {
    const response: { data: FarmsInterface, status: number } = await axios.get(url+`fazenda/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteFarm(id: string) {
    const response: { data: FarmInterface, status: number } = await axios.delete(url+`fazenda/api/v1/${id}/`, configAuth());
    return response;
}

export async function postFarm(dataFarm: FarmRegisterInterface) {
    const response: { data: FarmInterface, status: number } = await axios.post(url+`fazenda/api/v1/`, dataFarm, configAuth());
    return response;
}

export async function putFarm(dataFarm: FarmEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`fazenda/api/v1/${dataFarm.id}/`, dataFarm, configAuth());
    return response;
}