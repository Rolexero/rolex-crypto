import React from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context/CryptoContext";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const { trendingCrypto, status, currentData } = useGlobalContext();

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  let items = [];
  if (status === "success") {
    items = trendingCrypto.map((coin) => {
      let profit = coin?.price_change_percentage_24h >= 0
      return (
        <Link
          to={`/coins/${coin.id}`}
          className="d-flex flex-col text-center justify-center space-y-3 items-center cursor-pointer uppercase text-white"
        >
         
          <img
            src={coin?.image}
            alt={coin.name}
            height="20"
            width="90"
            className="mx-10 sm:mx-0"
          />
          <span className="flex flex-row ml-10 md:ml-0">
            {coin?.symbol}
            &nbsp;
            <span className={`${profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>

          <span className="text-lg font-bold ml-10 sm:ml-0">  
            {currentData.symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </Link>
      );
    });
  }

  return (
    <div className="container  mx-auto pb-20 flex mr-5 h-50 -mt-20">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
