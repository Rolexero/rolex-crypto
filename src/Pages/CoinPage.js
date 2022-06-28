import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/CryptoContext";
import { useQuery } from "react-query";
import { TrendingCoins, CoinList, SingleCoin } from "../Config/api";
import CoinInfo from "../Components/CoinInfo";
import CoinChart from "../Components/CoinChart";
import { LinearProgress } from "@mui/material";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currencyInfo, currentData } = useGlobalContext();

  const fetchCoinData = async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();
    return data;
  };

  const { data, status } = useQuery(["coinData", id], fetchCoinData);

  return (
    <div className=" h-full w-full bg-brightDark">
      {status === "loading" ? (
        <LinearProgress
          style={{ backgroundColor: "gold" }}
          className="container mx-auto"
        />
      ) : (
        <div className="flex flex-col text-white md:p-8 ">
          {/* Side Bar Info */}
          <div className="flex mt-5 justify-center items-center mx-auto">
            <CoinInfo data={data} status={status} />
          </div>
          {/* Coin Info */}
          <div className="">
            <CoinChart id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinPage;
