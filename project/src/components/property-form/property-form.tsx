import { useState } from 'react';
import { FormState, Ratings } from '../../types/property-form';
import PropertyFormRating from '../property-form-rating/property-form-rating';

const ratings: Ratings = [
  [5, 'perfect'],
  [4, 'good'],
  [3, 'not bad'],
  [2, 'badly'],
  [1, 'terribly']
];

const enum CommentLength {
  Min = 50,
  Max = 300
}

export default function PropertyForm() {
  const [formData, setFormData] = useState<FormState>(
    {
      comment: '',
      rating: 0
    }
  );
  const isSubmitDisabled = formData.comment.length <= CommentLength.Min ||
    formData.comment.length >= CommentLength.Max ||
    formData.rating === 0;

  const fieldChangeHandle = (name: string, value: number | string) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(([value, title]) => (
          <PropertyFormRating key={value} value={value} title={title} fieldChangeHandle={fieldChangeHandle}/>
        )
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onInput={(({currentTarget}) => {
          const {name, value} = currentTarget;
          fieldChangeHandle(name, value);
        }
        )}
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
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
