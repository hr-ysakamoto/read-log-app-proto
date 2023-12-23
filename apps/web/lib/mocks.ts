import { Container } from './common';

export const containers: Container[] = [
  {
    id: 'container-1',
    name: '読みたい',
    books: [
      {
        id: 'book-1',
        userId: 1,
        readingStateId: 1,
        orderNo: 1,
        googleId: 'test',
        isbn: 'test',
        title: 'title-1',
        subtitle: 'subtitle-1',
        authors: ['author1'],
        publicationDate: 'test',
        description: 'test',
        pageCount: 1,
        thumbnail:
          'http://books.google.com/books/content?id=dfVrzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        language: 'ja',
      },
      {
        id: 'book-2',
        userId: 1,
        readingStateId: 1,
        orderNo: 2,
        googleId: 'test',
        isbn: 'test',
        title: 'title-2',
        subtitle: 'subtitle-2',
        authors: ['author2'],
        publicationDate: 'test',
        description: 'test',
        pageCount: 1,
        thumbnail:
          'http://books.google.com/books/content?id=17yjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        language: 'ja',
      },
    ],
  },
  {
    id: 'container-2',
    name: '読んでる',
    books: [
      {
        id: 'book-3',
        userId: 1,
        readingStateId: 2,
        orderNo: 1,
        googleId: 'test',
        isbn: 'test',
        title: 'title-3',
        subtitle: 'subtitle-3',
        authors: ['author3'],
        publicationDate: 'test',
        description: 'test',
        pageCount: 1,
        thumbnail:
          'http://books.google.com/books/content?id=1EuqEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        language: 'ja',
      },
    ],
  },
  {
    id: 'container-3',
    name: '読んだ',
    books: [
      {
        id: 'book-4',
        userId: 1,
        readingStateId: 3,
        orderNo: 1,
        googleId: 'test',
        isbn: 'test',
        title: 'title-4',
        subtitle: 'subtitle-4',
        authors: ['author4'],
        publicationDate: 'test',
        description: 'test',
        pageCount: 1,
        thumbnail:
          'http://books.google.com/books/content?id=2X23DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        language: 'ja',
      },
      {
        id: 'book-5',
        userId: 1,
        readingStateId: 3,
        orderNo: 2,
        googleId: 'test',
        isbn: 'test',
        title: 'title-5',
        subtitle: 'subtitle-5',
        authors: ['author5'],
        publicationDate: 'test',
        description: 'test',
        pageCount: 1,
        thumbnail:
          'http://books.google.com/books/content?id=uWhmDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        language: 'ja',
      },
    ],
  },
];

export const statusList = [
  {
    id: 1,
    name: '読みたい',
    orderNo: 1,
  },
  {
    id: 2,
    name: '読んでる',
    orderNo: 2,
  },
  {
    id: 3,
    name: '読み終わった',
    orderNo: 3,
  },
];
