const reducer = (state, action) => {
  if (action.type === "SET_CURRENCY_SYMBOL") {
    return { ...state, currentData: action.payload };
  }

  if (action.type === "GET_TRENDING_CURRENCY") {
    return { ...state, trendingCrypto: action.payload };
  }

  if (action.type === "GET_COINLIST") {
    return { ...state, coinList: action.payload };
  }

  return state;
};
export default reducer;
