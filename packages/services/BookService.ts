import { GetBookOutput } from '@repo/models/types';
export class BookService {
  public async getBooks(): Promise<GetBookOutput> {
    const books = [
      {
        id: 'test',
        userId: 1,
        readingStateId: 1,
        orderNo: 1,
        googleId: 'test',
        isbn: 'test',
        title: 'test',
        subtitle: 'test',
        authors: ['test'],
        publicationDate: 'test',
        description: 'test',
        pageCount: 1,
        thumbnail: 'test',
        language: 'test',
      },
    ];
    return {
      books,
    };
  }
}
