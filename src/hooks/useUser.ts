import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { ApiUserResponse, User } from "@/types/user";

const mapApiUserToUser = (apiUser: ApiUserResponse["user"]): User => ({
  id: apiUser.id,
  email: apiUser.email,
  name: apiUser.name,
  pictureUrl: apiUser.picture_url,
  createdAt: new Date(apiUser.created_at),
  updatedAt: new Date(apiUser.updated_at),
});

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get<ApiUserResponse>("/users/me");
      return mapApiUserToUser(data.user);
    },
    retry: false,
  });
};
