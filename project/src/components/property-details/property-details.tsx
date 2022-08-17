import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { authSelector } from '../../store/auth-slice/selectors';
import { Property } from '../../types/property';
import { getCapitalizedWord, getRatingPercentage } from '../../utils';
import PropertyDetailsGallery from '../property-details-gallery/property-details-gallery';
import PropertyDetailsGoods from '../property-details-goods/property-details-goods';
import PropertyForm from '../property-form/property-form';
import ReviewsList from '../reviews-list/reviews-list';
import styles from '../property-details/property-details.module.css';

const MAX_IMAGES_COUNT = 6;

type ProperyDetailsProps = {
  property: Property;
}

export default function PropertyDetails({property}: ProperyDetailsProps) {
  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
    isFavorite,
    id
  } = property;

  const {isUserAuthorized} = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      <PropertyDetailsGallery images={images.slice(0, MAX_IMAGES_COUNT)}/>
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium &&
          <div className="property__mark">
            <span>Premium</span>
          </div>}
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title}
            </h1>
            <button
              className="property__bookmark-button button"
              type="button"
              onClick={() => {
                dispatch(changeFavoriteStatusAction({status: +!isFavorite, propertyId: id }));
              }}
            >
              <svg className={`property__bookmark-icon ${isFavorite && styles.buttonActive}`} width={31} height={33}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{ width: getRatingPercentage(rating) }} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {getCapitalizedWord(type)}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">€{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <PropertyDetailsGoods goods={goods} />
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro && 'property__avatar-wrapper--pro'}`}>
                <img
                  className="property__avatar user__avatar"
                  src={host.avatarUrl}
                  width={74}
                  height={74}
                  alt="Host avatar"
                />
              </div>
              <span className="property__user-name">{host.name}</span>
              {host.isPro && <span className="property__user-status">Pro</span>}
            </div>
            <div className="property__description">
              <p className="property__text">
                {description}
              </p>
            </div>
          </div>
          <section className="property__reviews reviews">
            <ReviewsList />
            {isUserAuthorized && <PropertyForm propertyId={id}/>}
          </section>
        </div>
      </div>
    </>
  );
}
