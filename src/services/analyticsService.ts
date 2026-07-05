import apiClient from "../api/apiClient";
import type { UserAnalytics } from "../types/profile";

const getUserAnalytics = async (
  username: string,
): Promise<UserAnalytics> => {
  const response = await apiClient.get<UserAnalytics>(
    `/api/analytics/${username}`,
  );

  return response.data;
};

export { getUserAnalytics };