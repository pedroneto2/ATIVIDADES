import 'components/templates/ShowPrice/ShowPrice.scss';
/* eslint-disable no-unused-vars */

const ShowPrice = ({ price = 0, textColor = 'black', size = 32 }) => {
  const intMoney = Math.trunc(price);
  const cents = Math.round((+price - intMoney) * 100);
  return (
    <div className="show-price-container" style={{ fontSize: size, color: textColor }}>
      {intMoney < 10 ? `0${intMoney},` : `${intMoney},`}
      <p
        className="cents"
        style={{
          fontSize: size * 0.35,
          right: size * 0.7,
          top: size * 0.25,
        }}
      >
        {cents < 10 ? `0${cents}` : cents}
      </p>
      <span className="text" style={{ fontSize: size * 0.5 }}>
        /mês
      </span>
    </div>
  );
};

export default ShowPrice;
