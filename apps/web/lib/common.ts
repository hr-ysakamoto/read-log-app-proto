export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  thumbnail: string;
}

export interface Container {
  id: string;
  name: string;
  books: Book[];
}
