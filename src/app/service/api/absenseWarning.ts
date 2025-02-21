import { AbsenseWarningInterface, AbsenseWarningsInterface, EmployeeLabelInterface, StatusResponse } from '@/data/types';
import axios from 'axios';
// import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
// const configAuth = () => {
//     const token = getCookie('access');
//     return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
// }

export async function absenseWarnings(page: number) {
    try {
        const response: { data: AbsenseWarningsInterface, status: number } = await axios.get(url+`/absence-warning?page=${page}`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}

export async function absenseWarning(id: string) {
    const response: { data: AbsenseWarningInterface, status: number } = await axios.get(url+`/absence-warning/${id}`);
    return response.data;
}

export async function deleteAbsenseWarning(id: string) {
    const response: { data: AbsenseWarningInterface, status: number } = await axios.delete(url+`/absence-warning/${id}`);
    return response;
}

export async function absenseWarningFindName(name: string) {
    const response: { data: AbsenseWarningsInterface, status: number } = await axios.get(url+`/absence-warning/${name}`);
    return response.data;
}

export async function postAbsenseWarning(matricula: number, funcionario_id: string, faltas: number, advertencias: number, mes: string) {
    const response: { data: AbsenseWarningsInterface, status: number } = await axios.post(url+`/absence-warning`, {matricula, funcionario_id, faltas, advertencias, mes});
    return response;
}

export async function putAbsenseWarning(id: string, matricula: number, funcionario_id: string, faltas: number, advertencias: number, mes: string) {
    const response: { data: AbsenseWarningsInterface, status: number } = await axios.put(url+`/absence-warning/${id}`, {matricula, funcionario_id, faltas, advertencias, mes});
    return response;
}

export async function dateAbsenseWarning() {
    try {
        const response: { data: EmployeeLabelInterface[], status: number } = await axios.get(url+`/absence-warning-date`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}