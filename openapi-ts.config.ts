import { defineConfig, defaultPlugins } from "@hey-api/openapi-ts";

const openApiEndpoint = `${process.env.VITE_API_URL}/api-json`;

export default defineConfig({
  experimentalParser: true,

  input: openApiEndpoint,
  output: { format: "prettier", path: "src/api-client" },
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-fetch",
    "@tanstack/react-query",
  ],
});
