import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {},
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_BASE_API_URL: z.string().min(1),
    NEXT_PUBLIC_BASE_WEBSOCKET_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    NEXT_PUBLIC_BASE_WEBSOCKET_URL: process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL,
  },
});
