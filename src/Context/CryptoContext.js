import React, { useState, useContext, useReducer, useEffect } from "react";
import reducer from './reducer'
import data from '../data'


const CryptoContext = React.createContext();

const defaultCurrencyState = {
  currencyInfo: data,
  currentData: data[0]
};


const CryptoProvider = ({ children }) => {
  const [currencyState, dispatchCurrencyAction] = useReducer(reducer, defaultCurrencyState);

const setCurrency = (currency)=>{
        dispatchCurrencyAction({ type: "SET_CURRENCY_SYMBOL" , payload: currency});

}
  useEffect(() => {
    dispatchCurrencyAction({type: 'GET_CURRENCY_SYMBOL'})
  
  }, [])
  
  return (
    <CryptoContext.Provider
    value={{
     ...currencyState,
     setCurrency
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

