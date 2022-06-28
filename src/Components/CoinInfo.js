import React from "react";
import parse from "html-react-parser";
import { useGlobalContext } from "../Context/CryptoContext";
import { LinearProgress } from "@mui/material";

const CoinInfo = ({ data, status }) => {
  const { currentData } = useGlobalContext();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const coinName = data?.name;

  return (
    <div className="text-white flex justify-center items-center flex-col">
      <div className="mb-10">
        <img src={data?.image.large} alt={data?.name} className="h-36" />
      </div>
      <div>
        <h3 className="font-bold mb-10 text-center text-3xl text-green-500">
          {coinName?.toUpperCase()}
        </h3>
      </div>
      <div>
        {parse(
          `<h3 className='text-center text-xl p-4'>${
            data?.description.en.split(". ")[0]
          }</h3>`
        )}
      </div>
      <div className="flex justify-start flex-col items-start">
        <span className="flex m-2">
          <h2 className="text-2xl text-bold text-green-500">Rank :</h2> &nbsp;
          &nbsp;
          <h3 className="text-xl">{data?.market_cap_rank}</h3>
        </span>
        <span className="flex m-2">
          <h2 className="text-xl text-bold text-green-500">Current Price :</h2>{" "}
          &nbsp; &nbsp;
          <h3 className="text-xl mt-1">{currentData.symbol}{numberWithCommas(data?.market_data.current_price[currentData.name.toLowerCase()])}</h3>
        </span>
        <span className="flex m-2">
          <h2 className="text-xl text-bold text-green-500">Market Cap : </h2>{" "}
          &nbsp; &nbsp;
          <h3 className="text-xl mt-1">{currentData.symbol}{numberWithCommas(data?.market_data.market_cap[currentData.name.toLowerCase()].toString().slice(0, -6))}</h3>
        </span>
      </div>
    </div>
  );
};

export default CoinInfo;
