import { z } from 'zod';
import { ToZod } from '../lib/zod';
export type Book = {
  id: string;
  userId: number;
  readingStateId: number;
  orderNo: number;
  googleId: string;
  isbn: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publicationDate: string;
  description: string;
  pageCount: number;
  thumbnail: string;
  language: string;
};

export type GetBookInput = {
  userId: number;
};

export const GetBookInputSchema = z.object({
  userId: z.string().transform(val => Number(val)),
});

export type GetBookOutput = {
  books: Book[];
};

export const GetBookOutputSchema = z.object<ToZod<GetBookOutput>>({
  books: z.array(
    z.object<ToZod<Book>>({
      id: z.string(),
      userId: z.number(),
      readingStateId: z.number(),
      orderNo: z.number(),
      isbn: z.string(),
      googleId: z.string(),
      title: z.string(),
      subtitle: z.string().optional(),
      authors: z.array(z.string()),
      publicationDate: z.string(),
      description: z.string(),
      pageCount: z.number(),
      thumbnail: z.string(),
      language: z.string(),
    }),
  ),
});
