import apiClient from "../api/apiClient";

const getProfileSummary = async (username: string) => {
  const response = await apiClient.get(`/api/profile/${username}`);

  return response.data;
};

export { getProfileSummary };