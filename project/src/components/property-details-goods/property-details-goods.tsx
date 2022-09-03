type PropertyDetailsGoodsProps = {
  goods: [string]
}

export default function PropertyDetailsGoods({goods}: PropertyDetailsGoodsProps) {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">{'What\'s inside'}</h2>
      <ul className="property__inside-list">
        {goods.map((item) => (
          <li
            className="property__inside-item"
            key={item}
            data-testid="good"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
