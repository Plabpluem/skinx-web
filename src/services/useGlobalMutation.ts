import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import qs from 'qs'

interface UseGlobalMutationOptions extends UseMutationOptions<any, any, any> {}

export function useGlobalNonTokenMutation(
  url_path: string,
  options?: UseGlobalMutationOptions
) {
  return useMutation<any, any, any>({
    mutationFn: async (values: any) => {
      const url = `${process.env.BACKEND_URL}${url_path}`;
      const res = await axios.post(url, values.data);
      return res.data;
    },
    ...options,
  });
}

export function useGlobalGetMutation(
  url_path: string,
  options?: UseGlobalMutationOptions
) {
  return useMutation<any, any, any>({
    mutationFn: async (values: any) => {
      const stored = localStorage.getItem("admin");
      const token = stored ? JSON.parse(stored).token : "";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...(values.data && { params: values.data }),
        paramsSerializer: (params:any) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      };

      const url = `${process.env.BACKEND_URL}${url_path}`;
      const res = await axios.get(url, config);
      return res.data;
    },
    ...options,
  });
}
