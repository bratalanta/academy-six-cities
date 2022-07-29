import React from 'react';
import { Reviews } from '../../types/review';
import ReviewsItem from '../reviews-item/reviews-item';

type ReviewsListProps = {
  reviews: Reviews;
}

export default function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} review={review}/>
      )
      )}
    </ul>
  );
}
