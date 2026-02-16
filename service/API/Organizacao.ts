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
  baseURL: 'https://api.bellory.com.br/api/v1',
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

export async function validaCNPJ(cnpj: string): Promise<Response> {
  try {
    
    const response = await api.get<Response>(`/organizacao/verificar-cnpj/${cnpj}`);
    
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

export async function validaEmail(email: string): Promise<Response> {
  try {
    
    const response = await api.get<Response>(`/organizacao/verificar-email/${email}`);
    
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

export async function validaUsename(username: string): Promise<Response> {
  try {
    
    const response = await api.get<Response>(`/organizacao/verificar-username/${username}`);
    
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



export async function getBuscarCEP(cep: any): Promise<any> {
  try {
    const response = await api.get<Response>(`https://viacep.com.br/ws/${cep}/json`);
    
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.mensagem || 'Erro ao buscar serviços.');
    }
    throw new Error('Erro de rede ou inesperado.');
  }
}