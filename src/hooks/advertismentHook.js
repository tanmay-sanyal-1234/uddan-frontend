import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAdvertisments = () => {
  return useQuery({
    queryKey: ["useGetAdvertisments"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/advertisments`
      );
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    cacheTime: 1000 * 60 * 60 * 24, // 1 day
  });
};
