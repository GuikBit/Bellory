import axios from "axios";

export interface Response {
  user?: any;
  token?: any;
  organizacao?: any;
  success: boolean
  message: string
  errorCode: number
  dados: any[] | any
}

const api = axios.create({
  baseURL: 'https://api.bellory.com.br/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


export async function postOrganizacao(payload: any): Promise<Response> {
  try {
    
    const response = await api.post<Response>('/organizacao', JSON.stringify(payload));
    
    return {
      success: response.data.success,
      message: response.data.message,
      errorCode: response.data.errorCode,
      dados: response.data.dados
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao buscar serviços.');
    }
    throw new Error('Erro de rede ou inesperado.');
  }
}