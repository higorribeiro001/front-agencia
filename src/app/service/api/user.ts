import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer '+token, 
            "ngrok-skip-browser-warning": true,
        }}
}

export async function users(page: number) {
    try {
        const response: { data: UsersInterface, status: number } = await axios.get(url+`auth/api/v1/register?page=${page}`, configAuth());
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

export async function user(id: string) {
    try {
        const response: { data: UserInterface, status: number } = await axios.get(url+`/user/${id}/`, configAuth());
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

export async function userFindByName(name: string) {
    const response: { data: UserInterface[], status: number } = await axios.get(url+`/user/${name}`, configAuth());
    return response.data;
}

export async function deleteUser(id: string) {
    const response: { data: UserInterface, status: number } = await axios.delete(url+`/user/${id}/`, configAuth());
    return response;
}

export async function postUser(dataUser: UserRegisterInterface) {
    const {
        name,
        email,
        phone,
        role,
        password
    } = dataUser;
    const response: { data: UserRegisterInterface, status: number } = await axios.post(url+`/register`, {
        name,
        email,
        phone,
        role,
        ativo: true,
        password
    }, configAuth());
    return response;
}

export async function putUser(dataUser: UserEditInterface) {
    const {
        id,
        name,
        email,
        phone,
        role,
        ativo
    } = dataUser;
    const response: { data: UserRegisterInterface, status: number } = await axios.put(url+`/user/${id}/`, {
        name,
        email,
        phone,
        role,
        ativo
    }, configAuth());
    return response;
}

export async function patchResetPassword(dataUser: ResetPasswordInterface) {
    const {
        id,
        password
    } = dataUser;
    const response: { data: ResetPasswordInterface, status: number } = await axios.patch(url+`/reset-password/${id}/`, {
        password,
    }, configAuth());
    return response;
}