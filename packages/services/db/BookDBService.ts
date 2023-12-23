import { Book, prisma } from '@repo/database';

export const selectBookEntities = async (): Promise<Book[]> => {
  return await prisma.book.findMany();
};
