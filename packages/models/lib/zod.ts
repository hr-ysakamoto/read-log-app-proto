import { z } from 'zod';

// biome-ignore lint: no-explicit-any
export type ToZod<T extends Record<string, any>> = {
  [K in keyof T]-?: T[K] extends (val: infer U) => any
    ? z.ZodEffects<z.ZodType<U, any, any>, U, string>
    : z.ZodType<T[K]>;
};
