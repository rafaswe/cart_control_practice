import { setCredentials } from "@/store/slices/authSlice"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const BASE_URL = "https://devapi.propsoft.ai/api/";

interface RequestConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  onSuccess?: (data: any) => void;
  onError?: (response: Response) => void;
  onFinally?: () => void;
  privateRoute?: boolean;
  isLogin?: boolean;
  redirectTo?: string | null;
}

export const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: any) => state.auth.token); // Adjust the path to your token state

  const makeRequest = async ({
    endpoint,
    method = "GET",
    headers = {},
    body = null,
    onSuccess = () => {},
    onError = () => {},
    onFinally = () => {},
    privateRoute = false,
    isLogin = false,
    redirectTo = null,
  }: RequestConfig) => {
    setIsLoading(true);

    try {
      const requestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
      };

      if (privateRoute && token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        onError(response);
        toast.error("Something went wrong...");
        return;
      }

      const data = await response.json();

      if (isLogin) {
        dispatch(
          setCredentials({
            email: data.user_data.email,
            token: data.access_token,
          })
        );

        if (redirectTo) {
          router.push(redirectTo);
        }
      }

      onSuccess(data);
    } catch (error) {
      toast.error("An error occurred.");
      onError(error as Response);
    } finally {
      setIsLoading(false);
      onFinally();
    }
  };

  return {
    makeRequest,
    isLoading,
  };
};
