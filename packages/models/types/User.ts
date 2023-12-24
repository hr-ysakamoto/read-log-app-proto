import { z } from 'zod';
import { ToZod } from '../lib/zod';

export type UserInput = {
  userId: number;
};
export const UserInputSchema = z.object<ToZod<UserInput>>({
  userId: z.number(),
});
export type UserOutput = {
  userName: string;
};
export const UserOutputSchema = z.object<ToZod<UserOutput>>({
  userName: z.string(),
});
