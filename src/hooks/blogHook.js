import { useQuery ,useMutation, useQueryClient,useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";


export const useGetPopulerBlogFirst = () => {
  return useQuery({
    queryKey: ["useGetPopulerBlogFirst"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?sort=popularity&page=1&limit=1`
      );
      return res.data?.data;
    }
  }); 
};
export const useGetPopulerBlogList = (page = 1, limit = 4, filters = "") => {
  return useInfiniteQuery({
    queryKey: ["useGetPopulerBlogList", page, limit, filters],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?sort=popularity&page=${pageParam}&limit=${limit}&${filters}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
        if (!lastPage?.pagination) return undefined;
        const { page, totalPage } = lastPage.pagination;
        const currentPage = parseInt(page);
        const totalPages = parseInt(totalPage);
        return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
        // If the status is 403, stop retrying immediately
        if (error?.response?.status === 403) {
            return false;
        }
        // Otherwise, retry up to 3 times (default behavior)
        return failureCount < 3;
    },
  }); 
};

export const useGetRecentBlogList = (page = 1, limit = 2, filters = "") => {
  return useInfiniteQuery({
    queryKey: ["useGetRecentBlogList", page, limit, filters],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?page=${pageParam}&limit=${limit}&${filters}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
        if (!lastPage?.pagination) return undefined;
        const { page, totalPage } = lastPage.pagination;
        const currentPage = parseInt(page);
        const totalPages = parseInt(totalPage);
        return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
        // If the status is 403, stop retrying immediately
        if (error?.response?.status === 403) {
            return false;
        }
        // Otherwise, retry up to 3 times (default behavior)
        return failureCount < 3;
    },
  }); 
};
export const useGetBlogDetails = ({slug}) => {
  return useQuery({
    queryKey: ["useGetBlogDetails"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${slug}`
      );
      return res.data?.data;
    },
    enabled:!!slug
  }); 
};

export const useBlogDetailsViewUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["useBlogDetailsViewUpdateAdd"],
        mutationFn: async (data) => {
            const { data: res } = await axios.patch(`${import.meta.env.VITE_API_URL}/blog/views/add/${data.slug}`);
            return res;
        }
    });

}

export const useGetPopulerBlogHeading = () => {
  return useQuery({
    queryKey: ["useGetPopulerBlogHeading"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/populer-blogs-headings`
      );
      return res.data?.data;
    }
  }); 
};