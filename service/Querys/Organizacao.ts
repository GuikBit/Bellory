
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBuscarCEP, getPlanos, postOrganizacao, validaCNPJ, validaEmail, validaUsename, validarCupom } from "../API/Organizacao";

export function useMutationPostOrganizacao(){
    // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['postOrganizacao'],
    mutationFn: async (payload: any) =>{
      const response = await postOrganizacao(payload); 
      if (response.success) {
        return response.dados;
      }  else {
        throw new Error(response.message);
      }         
    } 
  })
}

export function useMutationValidaCNPJ(){
    // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['validaCNPJ'],
    mutationFn: async (payload: any) =>{
      const response = await validaCNPJ(payload); 
      if (response.success) {
        return response;
      }  else {
        throw new Error(response.message);
      }         
    } 
  })
}

export function useMutationValidaEmail(){
    // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['validaEmail'],
    mutationFn: async (payload: any) =>{
      const response = await validaEmail(payload); 
      if (response.success) {
        return response;
      }  else {
        throw new Error(response.message);
      }         
    } 
  })
}

export function useMutationValidaUsername(){
    // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['validaUsename'],
    mutationFn: async (payload: any) =>{
      const response = await validaUsename(payload); 
      if (response.success) {
        return response;
      }  else {
        throw new Error(response.message);
      }         
    } 
  })
}

export function useMutationGetBuscarCEP(){
    // const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['buscarcep'],
        mutationFn: async (cep: any) =>{
            const response = await getBuscarCEP(cep); 
            return response;       
        } 
    })
}

export function useMutationValidarCupom(){
  return useMutation({
    mutationKey: ['validarCupom'],
    mutationFn: async (payload: { codigoCupom: string, planoCodigo: string, cicloCobranca: string }) =>{
      const response = await validarCupom(payload);
      if (response.success) {
        return response;
      } else {
        throw new Error(response.message);
      }
    }
  })
}

export function useGetPlanos() {

  return useQuery({
    queryKey: ['getPlanos'],
    queryFn: async () => {
        return await getPlanos();
    }
  });
}


