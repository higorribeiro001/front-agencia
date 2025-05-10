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

export async function revenues(page: number) {
    try {
        const response: { data: RevenuesInterface, status: number } = await axios.get(url+`receitas/api/v1/?page=${page}`, configAuth());
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

export async function revenuesFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`receitas/api/v1/itens/format/`, configAuth());
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

export async function revenue(id: string) {
    try {
        const response: { data: RevenueInterface, status: number } = await axios.get(url+`receitas/api/v1/${id}/`, configAuth());
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

export async function revenueFindByName(unity: string, name: string) {
    const response: { data: RevenuesInterface, status: number } = await axios.get(url+`receitas/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteRevenue(id: string) {
    const response: { data: RevenueInterface, status: number } = await axios.delete(url+`receitas/api/v1/${id}/`, configAuth());
    return response;
}

export async function postRevenue(dataRevenue: RevenueRegisterInterface) {
    const response: { data: RevenueInterface, status: number } = await axios.post(url+`receitas/api/v1/`, dataRevenue, configAuth());
    return response;
}

export async function putRevenue(dataRevenue: RevenueEditInterface) {
    const response: { data: RevenueRegisterInterface, status: number } = await axios.put(url+`receitas/api/v1/${dataRevenue.id}/`, dataRevenue, configAuth());
    return response;
}