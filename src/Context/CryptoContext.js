import React, { useState, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import dataItem from "../data";
import { useQuery } from "react-query";
import { TrendingCoins, CoinList } from "../Config/api";

const CryptoContext = React.createContext();

const defaultCurrencyState = {
  currencyInfo: dataItem,
  currentData: dataItem[0],
  trendingCrypto: [],
  coinList: []
};

const CryptoProvider = ({ children }) => {
  const [currencyState, dispatchCurrencyAction] = useReducer(
    reducer,
    defaultCurrencyState
  );

  const setCurrency = (currency) => {
    dispatchCurrencyAction({ type: "SET_CURRENCY_SYMBOL", payload: currency });
  };

  const fetchCurrencyInfo = async () => {
    const response = await fetch(TrendingCoins(currencyState.currentData.name));
    const data = await response.json();
    dispatchCurrencyAction({
      type: "GET_TRENDING_CURRENCY",
      payload: data,
    });
  };

    const fetchCoinList = async () => {
      const response = await fetch(CoinList(currencyState.currentData.name));
      const data = await response.json();
      dispatchCurrencyAction({
        type: "GET_COINLIST",
        payload: data,
      });
    };

  

  const { data, status } = useQuery(
    ["currencyInfo", currencyState.currentData.name],
    fetchCurrencyInfo
  );

    const { data: coinListItems, status: statusValue } = useQuery(
      ["coinList", currencyState.currentData.name],
      fetchCoinList
    );


  return (
    <CryptoContext.Provider
      value={{
        ...currencyState,
        status,
        setCurrency,
        statusValue
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(CryptoContext);
};

export { CryptoContext, CryptoProvider };
