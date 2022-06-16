import React, { useState } from "react";
import { useGlobalContext } from "../Context/CryptoContext";
import { Label, Checkbox, Button, TextInput, Table } from "flowbite-react";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Paginationcomp from "./Pagination";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [elemPerPage, setElemPerPage] = useState(10);
  const { statusValue, coinList, currentData } = useGlobalContext();
  

    const searchHandler = (e) => {
      setSearch(e);
      setCurrentPage(0);
    };


  let filterList = coinList.filter((coin) => {
    if (search === "") {
      return coin;
    } else if (
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    ) {
      return coin;
    }
  });

  let start = currentPage * elemPerPage;
  let end = Math.min((start + elemPerPage), filterList.length);

  // if (filterList.length === 0) {
  //   return (
  //     <div className="text-center bg-brightDark text-white">
  //       No coin to display
  //     </div>
  //   );
  // }

  return (
    <div className=" bg-brightDark text-white">
      <div className="text-center container mx-auto">
        <h2 className="text-2xl pt-5 sm:text:4xl">
          Crypto Currency Prices by Market Cap
        </h2>
        <form className="gap-4 w-80  mx-auto container justify-center  sm:w-auto">
          <Label className="mb-2 block" htmlFor="email1">
            Your email
          </Label>
          <TextInput
            display="true"
            value={search}
            name="true"
            id="email1"
            type="email"
            placeholder="Search For a Crypto Currency"
            required={true}
            onChange={(e) => searchHandler(e.target.value)}
          />
        </form>
      </div>
      <div>
        {statusValue === "loading" ? (
          <LinearProgress
            style={{ backgroundColor: "gold", marginTop: "20px" }}
            className="container mx-auto"
          />
        ) : (
          <table className={`rounded-lg mt-5 table-fixed container mx-auto overflow-scroll text-gray-200 ${filterList.length === 0 ? 'hidden' : ''}`}>
            <thead>
              <tr className="text-left border-b  border-gray-300 bg-colorGold">
                <th className="px-4 py-3">Coin</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">24h Change</th>
                <th className="px-4 py-3 text-right">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filterList
                .slice(start, end)
                .map((coin) => {
                  const profit = coin.price_change_percentage_24h > 0;
                  return (
                    <tr
                      className="border-b cursor-pointer hover:bg-black border-gray-600"
                      key={coin.name}
                      onClick={() => navigate(`/coins/${coin.id}`)}
                    >
                      <td className="px-4 py-3 flex flex-col gap-5 sm:flex-row">
                        <img
                          src={coin?.image}
                          alt={coin.name}
                          className="h-10"
                        />
                        <div className="flex flex-col">
                          <span className="text uppercase mt-1 text-left">
                            {coin.symbol}
                          </span>
                          <span className="text capitalize mt-1 text-left text-sm text-gray-400">
                            {coin.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {currentData.symbol}{" "}
                        {numberWithCommas(coin.current_price.toFixed(2))}
                      </td>
                      <td
                        className={`${
                          profit > 0 ? "text-green-500" : "text-red-500"
                        } px-4 py-3 text-right`}
                      >
                        {" "}
                        {profit && "+"}{" "}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        {currentData.symbol}{" "}
                        {numberWithCommas(
                          coin.market_cap.toString().slice(0, -6)
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        <div>
          <Paginationcomp
            filterList={filterList}
            start={start}
            end={end}
            setCurrentPage={setCurrentPage}
            statusValue={statusValue}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinsTable;
