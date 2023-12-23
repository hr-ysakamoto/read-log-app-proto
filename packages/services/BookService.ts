import { Book, GetBookOutput } from '@repo/models/types';
import { selectBookEntities } from './db/BookDBService';

export class BookService {
  public async getBooks(): Promise<GetBookOutput> {
    const entities = await selectBookEntities();
    const books: Book[] = entities.map(book => {
      return {
        ...book,
        id: `book-${book.id}`,
        authors: book.authors.split(','),
      };
    });
    return {
      books,
    };
  }
}
