import { Book } from '@repo/models/types';

export interface Container {
  id: string;
  name: string;
  books: Book[];
}
