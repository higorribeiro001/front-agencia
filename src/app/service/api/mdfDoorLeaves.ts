import { MdfDoorLeaveInterface, MdfDoorLeavesInterface } from '@/data/types';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function mdfDoorLeaves(page: number) {
    const response: { data: MdfDoorLeavesInterface, status: number } = await axios.get(url+`/mdf-door-leaves?page=${page}`, configAuth());
    return response.data;
}

export async function mdfDoorLeave(id: string) {
    const response: { data: MdfDoorLeaveInterface, status: number } = await axios.get(url+`/mdf-door-leaves/${id}`, configAuth());
    return response.data;
}

export async function deleteMdfDoorLeave(id: string) {
    const response: { data: MdfDoorLeaveInterface, status: number } = await axios.delete(url+`/mdf-door-leaves/${id}`, configAuth());
    return response;
}

export async function mdfDoorLeaveFindName(name: string) {
    const response: { data: MdfDoorLeavesInterface, status: number } = await axios.get(url+`/mdf-door-leaves/${name}`, configAuth());
    return response.data;
}

export async function postMdfDoorLeaveFindName(nome: string, largura: number, altura: number, sarrafo: number) {
    const response: { data: MdfDoorLeavesInterface, status: number } = await axios.post(url+`/mdf-door-leaves`, {nome, largura, altura, sarrafo}, configAuth());
    return response;
}

export async function putMdfDoorLeaveFindName(id: string, nome: string, chave: string, largura: number, altura: number, sarrafo: number, mdf_30: number, mdf_6_comum_2_qualidade: number, mdf_3_comum_1_qualidade: number, mdf_3_comum_2_qualidade: number, mdf_3_berneck: number, madeira: number, bondoor: number, total_mdf_m: number, total_mdf_m2_rec: number, total_mdf_m2_pintura: number, total_mdf_m3: number) {
    const response: { data: MdfDoorLeavesInterface, status: number } = await axios.put(url+`/mdf-door-leaves/${id}`, {nome, chave, largura, altura, sarrafo, mdf_30, mdf_6_comum_2_qualidade, mdf_3_comum_1_qualidade, mdf_3_comum_2_qualidade, mdf_3_berneck, madeira, bondoor, total_mdf_m, total_mdf_m2_rec, total_mdf_m2_pintura, total_mdf_m3}, configAuth());
    return response;
}