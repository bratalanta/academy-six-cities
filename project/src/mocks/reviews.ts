import { Reviews } from '../types/review';

export const reviews: Reviews = [
  {
    comment: 'looks good and pretty comfortable',
    date: '2022-07-17T10:57:56.625Z',
    id: 1,
    rating: 4.5,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: false,
      name: 'Munn'
    }
  },
  {
    comment: ' a a river.',
    date: '2021-07-17T10:57:56.625Z',
    id: 2,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Clow'
    }
  },
  {
    comment: 'hides behind',
    date: '2019-07-17T10:57:56.625Z',
    id: 3,
    rating: 2.1,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Sworen'
    }
  },
  {
    comment: 'A quiet cozy',
    date: '2000-07-17T10:57:56.625Z',
    id: 4,
    rating: 3.3,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Ronald'
    }
  }
];
