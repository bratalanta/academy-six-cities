import { generatePath, Link } from 'react-router-dom';
import { AppRoute, CardClassName, CardImageSize} from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { Property } from '../../types/property';
import { getRatingPercentage } from '../../utils';

type PropertyCardProps = {
  property: Property;
  cardClassName: CardClassName;
  onCardMouseEnter?: (id: number) => void;
  onCardMouseLeave?: () => void;
};

export default function PropertyCard(props: PropertyCardProps): JSX.Element {
  const {
    property,
    cardClassName,
    onCardMouseEnter,
    onCardMouseLeave
  } = props;
  const {
    id,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
    isFavorite
  } = property;

  const dispatch = useAppDispatch();

  return (
    <article
      className={`${cardClassName}__card place-card`}
      onMouseEnter={() => onCardMouseEnter?.(id)}
      onMouseLeave={() => onCardMouseLeave?.()}
    >
      {isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>}
      <div className={`${cardClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={ generatePath(AppRoute.Property, { id: `${id}`}) }>
          <img
            className="place-card__image"
            src={previewImage}
            width={CardImageSize[cardClassName].width}
            height={CardImageSize[cardClassName].height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`place-card__info ${cardClassName === CardClassName.Favorites && 'favorites__card-info'}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
            type="button"
            onClick={() => (
              dispatch(changeFavoriteStatusAction(
                {
                  status: Number(!isFavorite),
                  propertyId: id
                }
              )))}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingPercentage(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={ generatePath(AppRoute.Property, { id: `${id}`}) }
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
