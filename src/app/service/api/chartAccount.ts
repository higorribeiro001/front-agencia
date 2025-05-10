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

export async function chartAccounts(page: number) {
    try {
        const response: { data: ChartAccountsInterface, status: number } = await axios.get(url+`plano-contas/api/v1/?page=${page}`, configAuth());
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

export async function chartAccountsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`plano-contas/api/v1/itens/format/`, configAuth());
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

export async function chartIdAccountsFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`plano-contas/api/v1/id-contas/itens/format/`, configAuth());
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

export async function chartAccount(id: string) {
    try {
        const response: { data: ChartAccountInterface, status: number } = await axios.get(url+`plano-contas/api/v1/${id}/`, configAuth());
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

export async function chartAccountFindByName(unity: string, name: string) {
    const response: { data: ChartAccountsInterface, status: number } = await axios.get(url+`plano-contas/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteChartAccount(id: string) {
    const response: { data: ChartAccountInterface, status: number } = await axios.delete(url+`plano-contas/api/v1/${id}/`, configAuth());
    return response;
}

export async function postChartAccount(dataChartAccount: ChartAccountRegisterInterface) {
    const response: { data: ChartAccountInterface, status: number } = await axios.post(url+`plano-contas/api/v1/`, dataChartAccount, configAuth());
    return response;
}

export async function putChartAccount(dataChartAccount: ChartAccountEditInterface) {
    const response: { data: ChartAccountRegisterInterface, status: number } = await axios.put(url+`plano-contas/api/v1/${dataChartAccount.id}/`, dataChartAccount, configAuth());
    return response;
}