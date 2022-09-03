type PropertyDetailsGalleryProps = {
  images: string[]
}

export default function PropertyDetailsGallery({images}: PropertyDetailsGalleryProps) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => (
          <div className="property__image-wrapper" key={image}>
            <img
              className="property__image"
              src={image}
              alt="Photo studio"
              data-testid="gallery-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
