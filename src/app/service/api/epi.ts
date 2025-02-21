import { EmployeeLabelInterface, EpiInterface, EpisInterface, StatusResponse } from '@/data/types';
import axios from 'axios';
// import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
// const configAuth = () => {
//     const token = getCookie('access');
//     return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
// }

export async function epis(page: number) {
    try {
        const response: { data: EpisInterface, status: number } = await axios.get(url+`/epi?page=${page}`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}

export async function epi(id: string) {
    const response: { data: EpiInterface, status: number } = await axios.get(url+`/epi/${id}`);
    return response.data;
}

export async function deleteEpi(id: string) {
    const response: { data: EpiInterface, status: number } = await axios.delete(url+`/epi/${id}`);
    return response;
}

export async function epiFindName(name: string) {
    const response: { data: EpisInterface, status: number } = await axios.get(url+`/epi/${name}`);
    return response.data;
}

export async function postEpi(matricula: number, funcionario_id: string, conforme: boolean, data_abordagem: string) {
    const response: { data: EpisInterface, status: number } = await axios.post(url+`/epi`, {matricula, funcionario_id, conforme, data_abordagem});
    return response;
}

export async function putEpi(id: string, matricula: number, funcionario_id: string, conforme: boolean, data_abordagem: string) {
    const response: { data: EpisInterface, status: number } = await axios.put(url+`/epi/${id}`, {matricula, funcionario_id, conforme, data_abordagem});
    return response;
}

export async function dateEpi() {
    try {
        const response: { data: EmployeeLabelInterface[], status: number } = await axios.get(url+`/epi-date`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}