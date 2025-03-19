import axios from 'axios';

export async function getCities(uf: string) {
    try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        return []
    }
}