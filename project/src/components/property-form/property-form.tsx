import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RATINGS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { getPostingStatus } from '../../store/reviews-slice/selectors';
import { FormState } from '../../types/property-form';
import ButtonLoader from '../button-loader/button-loader';
import PropertyFormRating from '../property-form-rating/property-form-rating';
import styles from '../property-form/property-form.module.css';

const enum CommentLength {
  Min = 50,
  Max = 300
}

type PropertyFormProps = {
  propertyId: number;
}

export default function PropertyForm({propertyId}: PropertyFormProps): JSX.Element {
  const [formData, setFormData] = useState<FormState>(
    {
      comment: '',
      rating: '0',
    }
  );
  const dispatch = useAppDispatch();

  const {
    isPostingStatusFulfilled,
    isPostingStatusPending,
    isPostingStatusRejected
  } = useAppSelector(getPostingStatus);

  useEffect(() => {
    if (isPostingStatusFulfilled) {
      setFormData({
        comment: '',
        rating: '0'
      });
    }
  }, [isPostingStatusFulfilled]);

  const isSubmitDisabled = formData.comment.length <= CommentLength.Min ||
    formData.comment.length >= CommentLength.Max ||
    formData.rating === '0';

  const handleFieldChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postReviewAction({...formData, propertyId}));
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
      data-testid="property-form"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className={`reviews__rating-form form__rating ${isPostingStatusRejected && styles.horizontalShake}`}>
        {RATINGS.map(([value, title]) => (
          <PropertyFormRating
            key={value}
            value={value}
            title={title}
            handleFieldChange={handleFieldChange}
            currentRating={formData.rating}
          />
        )
        )}
      </div>
      <textarea
        className={`reviews__textarea form__textarea ${isPostingStatusRejected && styles.horizontalShake}`}
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleFieldChange}
        data-testid="textarea"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isPostingStatusPending}
        >
          {isPostingStatusPending ? <ButtonLoader /> : 'Submit'}
        </button>
      </div>
    </form>
  );
}
