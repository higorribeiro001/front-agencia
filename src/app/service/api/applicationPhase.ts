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

export async function applicationPhases(page: number) {
    try {
        const response: { data: ApplicationPhasesInterface, status: number } = await axios.get(url+`fase-aplicacao/api/v1/?page=${page}`, configAuth());
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

export async function applicationPhasesFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`fase-aplicacao/api/v1/itens/format/`, configAuth());
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

export async function applicationPhase(id: string) {
    try {
        const response: { data: ApplicationPhaseInterface, status: number } = await axios.get(url+`fase-aplicacao/api/v1/${id}/`, configAuth());
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

export async function applicationPhaseFindByName(unity: string, name: string) {
    const response: { data: ApplicationPhasesInterface, status: number } = await axios.get(url+`fase-aplicacao/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteApplicationPhase(id: string) {
    const response: { data: ApplicationPhaseInterface, status: number } = await axios.delete(url+`fase-aplicacao/api/v1/${id}/`, configAuth());
    return response;
}

export async function postApplicationPhase(dataApplicationPhase: ApplicationPhaseRegisterInterface) {
    const response: { data: ApplicationPhaseInterface, status: number } = await axios.post(url+`fase-aplicacao/api/v1/`, dataApplicationPhase, configAuth());
    return response;
}

export async function putApplicationPhase(dataApplicationPhase: ApplicationPhaseEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`fase-aplicacao/api/v1/${dataApplicationPhase.id}/`, dataApplicationPhase, configAuth());
    return response;
}