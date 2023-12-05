import { z } from "zod";
import { ToZod } from "../lib/zod";

export type UserInput = {
  userId: string;
};
export const UserInputSchema = z.object<ToZod<UserInput>>({
  userId: z.string().regex(/\d+/),
});
export type UserOutput = {
  userName: string;
};
export const UserOutputSchema = z.object<ToZod<UserOutput>>({
  userName: z.string(),
});
