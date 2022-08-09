import { useAppSelector } from '../../hooks';
import { getLimitedSortedReviews } from '../../store/reviews-slice/selectors';
import ReviewsItem from '../reviews-item/reviews-item';

export default function ReviewsList(): JSX.Element {
  const {limitedSortedReviews} = useAppSelector(getLimitedSortedReviews);

  return (
    <>
      <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{limitedSortedReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitedSortedReviews.map((review) => (
          <ReviewsItem key={review.id} review={review}/>
        ))}
      </ul>
    </>
  );
}
