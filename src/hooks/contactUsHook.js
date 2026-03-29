import { useQuery ,useMutation, useQueryClient,useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";

export const useContactForm = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["useContactFormAdd"],
        mutationFn: async (data) => {
            const { data: res } = await axios.post(`${import.meta.env.VITE_API_URL}/contact-us`,data);
            return res;
        }
    });

}
export const useNewsLetterSubscribe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["newsLetterSubscribe"],
        mutationFn: async (data) => {
            const { data: res } = await axios.patch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe/${data.email}`);
            return res;
        }
    });

}