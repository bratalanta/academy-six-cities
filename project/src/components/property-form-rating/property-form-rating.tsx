import { ChangeEvent } from 'react';

type PropertyFormRatingProps = {
  value: number;
  title: string;
  handleFieldChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  currentRating: string;
}

export default function PropertyFormRating(
  {value, title, handleFieldChange, currentRating}: PropertyFormRatingProps
): JSX.Element {

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={handleFieldChange}
        checked={value === +currentRating}
        data-testid="input"
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}
