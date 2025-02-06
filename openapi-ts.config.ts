import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts";
import { config } from "dotenv";

config();

const openApiEndpoint = `${process.env.VITE_API_URL}/api-json`;

export default defineConfig({
  client: "@hey-api/client-fetch",
  experimentalParser: true,

  input: openApiEndpoint,
  output: { format: "prettier", path: "src/api-client" },
  plugins: [...defaultPlugins, "@tanstack/react-query"],
});
