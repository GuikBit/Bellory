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
  // baseURL: 'https://api.bellory.com.br/api/v1',
  baseURL: 'https://api-dev.bellory.com.br/api/v1',
  // baseURL: 'http://localhost:8081/api/v1',
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

export interface DadosCNPJEnriquecidos {
  razaoSocial: string
  nomeFantasia: string
  email: string
  telefone: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  municipio: string
  uf: string
}

/**
 * Busca dados públicos do CNPJ na BrasilAPI (gratuita, sem auth).
 * Usado para auto-preencher Razão Social, Nome Fantasia e endereço no cadastro.
 * Retorna null em caso de erro/CNPJ não encontrado — chamador trata silenciosamente.
 */
export async function consultarCNPJBrasilAPI(
  cnpj: string
): Promise<DadosCNPJEnriquecidos | null> {
  try {
    const cnpjLimpo = cnpj.replace(/\D/g, "")
    if (cnpjLimpo.length !== 14) return null

    const response = await axios.get(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`,
      { timeout: 8000 }
    )
    const d: any = response.data

    const ddd = d.ddd_telefone_1 ? String(d.ddd_telefone_1).replace(/\D/g, "") : ""
    const telefoneFormatado =
      ddd.length === 10
        ? `(${ddd.slice(0, 2)}) ${ddd.slice(2, 6)}-${ddd.slice(6)}`
        : ddd.length === 11
        ? `(${ddd.slice(0, 2)}) ${ddd.slice(2, 7)}-${ddd.slice(7)}`
        : ""

    const cepLimpo = d.cep ? String(d.cep).replace(/\D/g, "") : ""
    const cepFormatado =
      cepLimpo.length === 8 ? `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}` : ""

    return {
      razaoSocial: d.razao_social || "",
      nomeFantasia: d.nome_fantasia || "",
      email: d.email || "",
      telefone: telefoneFormatado,
      cep: cepFormatado,
      logradouro: d.logradouro || "",
      numero: d.numero ? String(d.numero) : "",
      complemento: d.complemento || "",
      bairro: d.bairro || "",
      municipio: d.municipio || "",
      uf: d.uf || "",
    }
  } catch {
    return null
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

export async function validarCupom(payload: { codigoCupom: string, planoCodigo: string, cicloCobranca: string }): Promise<Response> {
  try {
    const cycle = payload.cicloCobranca?.toUpperCase() === 'ANUAL' ? 'ANNUAL' : 'MONTHLY';
    const response = await api.post('public/planos/cupom/validar', {
      couponCode: payload.codigoCupom.toUpperCase(),
      scope: 'SUBSCRIPTION',
      planCode: payload.planoCodigo,
      cycle,
    });
    const raw: any = response.data;

    return {
      success: !!raw?.valid,
      message: raw?.message ?? '',
      errorCode: 0,
      dados: raw,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const data: any = error.response.data;
      if (data && typeof data.valid === 'boolean') {
        return {
          success: false,
          message: data.message ?? 'Cupom inválido',
          errorCode: 0,
          dados: data,
        };
      }
      throw new Error(data?.message || 'Erro ao validar cupom.');
    }
    throw new Error('Erro de rede ou inesperado.');
  }
}

export async function getPlanos(): Promise<Response> {
  try {
    const response = await api.get(`public/planos`);
    const raw: any = response.data;

    if (Array.isArray(raw)) {
      return {
        success: true,
        message: 'OK',
        errorCode: 0,
        dados: raw,
      };
    }

    return {
      success: raw?.success,
      message: raw?.message,
      errorCode: raw?.errorCode,
      dados: raw?.dados,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro ao buscar planos.');
    }
    throw new Error('Erro de rede ou inesperado.');
  }
}