
import { useMutation } from "@tanstack/react-query";
import { postOrganizacao } from "../API/Organizacao";

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