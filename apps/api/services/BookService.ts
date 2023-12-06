import { GetBookOutput } from "@repo/models/types";

export class BookService {
  public async getBooks(): Promise<GetBookOutput> {
    const books = [
      {
        isbn: "test",
        googleBookId: "test",
        title: "test",
        authors: ["test"],
        publicationDate: "test",
        description: "test",
        pageCount: 1,
        thumbnailUrl: "test",
        language: "test",
      },
    ];
    return {
      books,
    };
  }
}
