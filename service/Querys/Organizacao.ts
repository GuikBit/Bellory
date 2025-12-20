
import { useMutation } from "@tanstack/react-query";
import { getBuscarCEP, postOrganizacao, validaCNPJ, validaEmail, validaUsename } from "../API/Organizacao";

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