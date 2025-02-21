import { DssInterface, DsssInterface, EmployeeLabelInterface, StatusResponse } from '@/data/types';
import axios from 'axios';
// import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
// const configAuth = () => {
//     const token = getCookie('access');
//     return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
// }

export async function dsss(page: number) {
    try {
        const response: { data: DsssInterface, status: number } = await axios.get(url+`/dss?page=${page}`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}

export async function dss(id: string) {
    const response: { data: DssInterface, status: number } = await axios.get(url+`/dss/${id}`);
    return response.data;
}

export async function deleteDss(id: string) {
    const response: { data: DssInterface, status: number } = await axios.delete(url+`/dss/${id}`);
    return response;
}

export async function dssFindName(name: string) {
    const response: { data: DsssInterface, status: number } = await axios.get(url+`/dss/${name}`);
    return response.data;
}

export async function postDss(matricula: number, funcionario_id: string, presenca: boolean, data_realizacao: string) {
    const response: { data: DsssInterface, status: number } = await axios.post(url+`/dss`, {matricula, funcionario_id, presenca, data_realizacao});
    return response;
}

export async function putDss(id: string, matricula: number, funcionario_id: string, presenca: boolean, data_realizacao: string) {
    const response: { data: DsssInterface, status: number } = await axios.put(url+`/dss/${id}`, {matricula, funcionario_id, presenca, data_realizacao});
    return response;
}

export async function dateDss() {
    try {
        const response: { data: EmployeeLabelInterface[], status: number } = await axios.get(url+`/dss-date`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}