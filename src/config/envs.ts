import { z } from 'zod';

const enviromentSchema = z.object({
  VITE_API_URL: z.string().url(),
});
// export const apiUrl = 'https://vanile-back.fixa.digital';

const { VITE_API_URL } = import.meta.env;

const parsedResult = enviromentSchema.safeParse({ VITE_API_URL });

if (!parsedResult.success) {
  throw new Error('Enviromet dont match the schema');
}

export const env = parsedResult.data;
