import { Book, prisma } from '@repo/database';

export const selectBookEntities = async (userId: number): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
};
