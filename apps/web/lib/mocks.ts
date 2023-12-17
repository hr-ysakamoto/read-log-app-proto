import { Container } from './common';

export const containers: Container[] = [
  {
    id: 'container-1',
    name: '読みたい',
    books: [
      {
        id: 'book-1',
        title: 'title-1',
        subtitle: 'subtitle-1',
        author: 'author1',
        thumbnail:
          'http://books.google.com/books/content?id=dfVrzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      },
      {
        id: 'book-2',
        title: 'title-2',
        subtitle: 'subtitle-2',
        author: 'author2',
        thumbnail:
          'http://books.google.com/books/content?id=17yjDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    ],
  },
  {
    id: 'container-2',
    name: '読んでる',
    books: [
      {
        id: 'book-3',
        title: 'title-3',
        subtitle: 'subtitle-3',
        author: 'author3',
        thumbnail:
          'http://books.google.com/books/content?id=1EuqEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    ],
  },
  {
    id: 'container-3',
    name: '読んだ',
    books: [
      {
        id: 'book-4',
        title: 'title-4',
        subtitle: 'subtitle-4',
        author: 'author4',
        thumbnail:
          'http://books.google.com/books/content?id=2X23DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      {
        id: 'book-5',
        title: 'title-5',
        subtitle: 'subtitle-5',
        author: 'author5',
        thumbnail:
          'http://books.google.com/books/content?id=uWhmDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
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
