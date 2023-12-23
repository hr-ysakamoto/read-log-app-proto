import { PrismaClient } from '@prisma/client';

export const getPrismaClient = () => {
  const prismaClient = new PrismaClient({
    log: [{ level: 'query', emit: 'event' }],
  });
  prismaClient.$on('query', event => {
    console.info(
      `Query: ${event.query}`,
      `Params: ${event.params}`,
      `Duration: ${event.duration} ms`,
    );
  });
  return prismaClient;
};

export const prisma = getPrismaClient();
