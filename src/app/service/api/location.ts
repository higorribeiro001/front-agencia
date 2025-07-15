import axios from "axios";

export async function getLocation(cep: string) {
  return await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);
}