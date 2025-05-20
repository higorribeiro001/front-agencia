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

export async function owners(page: number) {
    try {
        const response: { data: OwnersInterface, status: number } = await axios.get(url+`proprietario/api/v1/?page=${page}`, configAuth());
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

export async function ownersFormat() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`proprietario/api/v1/itens/format/`, configAuth());
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

export async function owner(id: string) {
    try {
        const response: { data: OwnerInterface, status: number } = await axios.get(url+`proprietario/api/v1/${id}/`, configAuth());
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

export async function ownerFindByName(unity: string, name: string) {
    const response: { data: OwnersInterface, status: number } = await axios.get(url+`proprietario/api/v1/${unity}/${name}`, configAuth());
    return response.data;
}

export async function deleteOwner(id: string) {
    const response: { data: OwnerInterface, status: number } = await axios.delete(url+`proprietario/api/v1/${id}/`, configAuth());
    return response;
}

export async function postOwner(dataOwner: OwnerRegisterInterface) {
    const response: { data: OwnerInterface, status: number } = await axios.post(url+`proprietario/api/v1/`, dataOwner, configAuth());
    return response;
}

export async function putOwner(dataOwner: OwnerEditInterface) {
    const response: { data: LogisticRegisterInterface, status: number } = await axios.put(url+`proprietario/api/v1/${dataOwner.id}/`, dataOwner, configAuth());
    return response;
}