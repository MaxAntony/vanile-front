import { client } from "../api-client";
import { env } from "./envs";

client.setConfig({ baseUrl: env.VITE_API_URL });

client.interceptors.request.use((request) => {
  request.headers.set(
    "Authorization",
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2OGU4NDE5LWFlNWQtNGUxYy1hNTI3LWIyODk2M2FhMjFlYiIsImlhdCI6MTcyMjYxNjIyNywiZXhwIjoxNzIyNjIzNDI3fQ.yccEjhsuv9ayVojNM94m76ZzZ2r_VkAuy83GGv-CnXM`
  );
  return request;
});

client.interceptors.response.use((response) => {
  // trackAnalytics(response);
  return response;
});
