import { EmployeeInterface, EmployeeLabelInterface, EmployeesInterface, StatusResponse } from '@/data/types';
import axios from 'axios';
// import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
// const configAuth = () => {
//     const token = getCookie('access');
//     return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
// }

export async function employees(page: number) {
    try {
        const response: { data: EmployeesInterface, status: number } = await axios.get(url+`/employee?page=${page}`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}

export async function employee(id: string) {
    const response: { data: EmployeeInterface, status: number } = await axios.get(url+`/employee/${id}`);
    return response.data;
}

export async function deleteEmployee(id: string) {
    const response: { data: EmployeeInterface, status: number } = await axios.delete(url+`/employee/${id}`);
    return response;
}

export async function employeeFindName(name: string) {
    const response: { data: EmployeesInterface, status: number } = await axios.get(url+`/employee/${name}`);
    return response.data;
}

export async function postEmployee(cod_funcionario: number, funcionario: string, setor: string, funcao: string, categoria: string, categoria_bonus: string, mes: string) {
    const response: { data: EmployeesInterface, status: number } = await axios.post(url+`/employee`, {cod_funcionario, funcionario, setor, funcao, categoria, categoria_bonus, mes, is_active: true});
    return response;
}

export async function putEmployee(id: string, cod_funcionario: number, funcionario: string, setor: string, funcao: string, categoria: string, categoria_bonus: string, mes: string, is_active: boolean) {
    const response: { data: EmployeesInterface, status: number } = await axios.put(url+`/employee/${id}`, {cod_funcionario, funcionario, setor, funcao, categoria, categoria_bonus, mes, is_active});
    return response;
}

export async function employeesLabel() {
    try {
        const response: { data: EmployeeLabelInterface[], status: number } = await axios.get(url+`/employees`);
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        console.log(error);
    }
}