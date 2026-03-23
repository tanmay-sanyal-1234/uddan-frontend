import { useQuery ,useMutation, useQueryClient,useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";

// export const useGetCollegeList = (page = 1, limit = 10, filters = "") => {
//   return useQuery({
//     queryKey: ["useGetCollegeList", page, limit, filters],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/find-collages?page=${page}&limit=${limit}&${filters}`
//       );
//       return res.data;
//     }
//   }); 
// };

// export const useGetCollegeList = (limit = 10, filters = "") => {
//   return useInfiniteQuery({
//     queryKey: ["useGetCollegeList", filters],

//     queryFn: async ({ pageParam = 1 }) => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/find-collages?page=${pageParam}&limit=${limit}&${filters}`
//       );

//       return res.data;
//     },

//     getNextPageParam: (lastPage) => {
//       // Adjust according to your backend response
//       if (lastPage.currentPage < lastPage.totalPages) {
//         return lastPage.currentPage + 1;
//       }
//       return undefined;
//     },
//   });
// };


export const useGetCollegeList = (page = 1, limit = 4, filters = "") => {
  return useInfiniteQuery({
    queryKey: ["useGetCollegeList", page, limit, filters],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/find-collages?&page=${pageParam}&limit=${limit}&${filters}`
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



export const useGetCollegeListHome = ({page = 1, limit = 10, courseId}) => {
  return useQuery({
    queryKey: ["useGetCollegeListHome", page, limit, courseId],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/find-collages?page=${page}&limit=${limit}&course=${courseId}`
      );
      return res.data;
    },
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  }); 
};

export const useGetCollegeDetailsById = (id) => {
  return useQuery({
    queryKey: ["useGetCollegeDetailsById", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-college/${id}`
      );
      return res.data?.data;
    },
    enabled: !!id
  }); 
};

export const useGetStreams = () => {
  return useQuery({
    queryKey: ["useGetStreams"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/find-streams`
      );
      return res.data?.data;
    }
  }); 
};

export const useGetCityState = () => {
  return useQuery({
    queryKey: ["useGetCityState"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-state-and-cities`
      );
      return res.data?.data;
    }
  }); 
};
export const useGetCity = () => {
  return useQuery({
    queryKey: ["useGetCity"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-cities`
      );
      return res.data?.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000 // 30 minutes
  }); 
};

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["useGetCourses"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/find-courses`
      );
      return res.data?.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  }); 
};
export const useGetCoursesForCollegeWise = (id = "") => {
  return useQuery({
    queryKey: ["useGetCoursesForCollegeWise", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin-api/get-courses/${id}`
      );
      return res.data?.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  }); 
};

export const useAddUniversityEnquiryForm = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["useAddUniversityEnquiryFormAdd"],
        mutationFn: async (data) => {
            const { data: res } = await axios.post(`${import.meta.env.VITE_API_URL}/apply-course`,data);
            return res;
        }
        // onSuccess: async (data, variables) => {
        //     await queryClient.invalidateQueries({
        //         queryKey: ["getAllInvitations", "RECEIVED"],
        //     });

        // },
    });

}