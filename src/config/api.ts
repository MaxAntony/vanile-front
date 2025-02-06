import { client } from "../api-client/client.gen";
import { env } from "./envs";

client.setConfig({ baseUrl: env.VITE_API_URL });

client.interceptors.request.use((request) => {
  // const authStore = useAuthStore();
  // request.headers.set("Authorization", `Bearer ${authStore.token}`);
  return request;
});

client.interceptors.response.use((response) => {
  // const { logout } = useAuthStore();
  // if (response.status === 401) {
  //   logout();
  // }

  // trackAnalytics(response);
  return response;
});
