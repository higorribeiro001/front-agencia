import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 
        'Accept': 'application/json', 
        'Authorization': 'Bearer '+token, 
        // "ngrok-skip-browser-warning": "69420"
    }}
}

export async function expenses(page: number) {
    try {
        const response: { data: ExpensesInterface, status: number } = await axios.get(url+`despesas/api/v1/?page=${page}`, configAuth());
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

export async function expensesFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`despesas/api/v1/itens/format/`, configAuth());
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

export async function expense(id: string) {
    try {
        const response: { data: ExpenseInterface, status: number } = await axios.get(url+`despesas/api/v1/${id}/`, configAuth());
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

export async function expenseFindByName(unity: string, name: string) {
    const response: { data: ExpensesInterface, status: number } = await axios.get(url+`despesas/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteExpense(id: string) {
    const response: { data: ExpenseInterface, status: number } = await axios.delete(url+`despesas/api/v1/${id}/`, configAuth());
    return response;
}

export async function postExpense(dataExpense: ExpenseRegisterInterface) {
    const response: { data: ExpenseInterface, status: number } = await axios.post(url+`despesas/api/v1/`, dataExpense, configAuth());
    return response;
}

export async function putExpense(dataExpense: ExpenseEditInterface) {
    const response: { data: ExpenseRegisterInterface, status: number } = await axios.put(url+`despesas/api/v1/${dataExpense.id}/`, dataExpense, configAuth());
    return response;
}