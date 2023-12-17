import { z } from 'zod';

// biome-ignore lint: no-explicit-any
export type ToZod<T extends Record<string, any>> = {
  [K in keyof T]-?: z.ZodType<T[K]>;
};
