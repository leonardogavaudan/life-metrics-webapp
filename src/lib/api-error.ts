import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export const handleApiError = (
  error: unknown,
  fallbackMessage: string = "An error occurred"
): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.message || axiosError.message;
    console.error("API Error:", errorMessage, axiosError.response?.data);
    return errorMessage;
  }

  console.error("Unexpected error:", error);
  return fallbackMessage;
};

export const showApiError = (
  error: unknown,
  fallbackMessage: string = "An error occurred"
): void => {
  const message = handleApiError(error, fallbackMessage);
  toast({
    variant: "destructive",
    title: "Error",
    description: message,
  });
};
