const reducer = (state, action) => {
    if (action.type === "GET_CURRENCY_SYMBOL") {
        return {...state };
    }

    if (action.type === "SET_CURRENCY_SYMBOL") {
        return {...state, currentData: action.payload }
    }
    return state;

}
export default reducer;