import { z } from 'zod'
import { ToZod } from '../lib/zod'

export type Book = {
  isbn: string
  googleBookId: string
  title: string
  subtitle?: string
  authors: string[]
  publicationDate: string
  description: string
  pageCount: number
  thumbnailUrl: string
  language: string
}

export type GetBookInput = {
  userId: string
}

export const GetBookInputSchema = z.object<ToZod<GetBookInput>>({
  userId: z.string().regex(/\d+/),
})

export type GetBookOutput = {
  books: Book[]
}

export const GetBookOutputSchema = z.object<ToZod<GetBookOutput>>({
  books: z.array(
    z.object<ToZod<Book>>({
      isbn: z.string(),
      googleBookId: z.string(),
      title: z.string(),
      subtitle: z.string().optional(),
      authors: z.array(z.string()),
      publicationDate: z.string(),
      description: z.string(),
      pageCount: z.number(),
      thumbnailUrl: z.string(),
      language: z.string(),
    }),
  ),
})
