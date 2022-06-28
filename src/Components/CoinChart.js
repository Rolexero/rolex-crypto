import React, {useState} from 'react'
import { HistoricalChart } from "../Config/api";
import { useQuery } from "react-query";
import { useGlobalContext } from "../Context/CryptoContext";
import { CircularProgress, LinearProgress } from '@mui/material';
import { Line } from "react-chartjs-2";
import {chartDays} from '../Config/data'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({id}) => {
    const { currentData } = useGlobalContext();
    const [days, setDays] = useState(1)
        const fetchCoinChart = async () => {
          const response = await fetch(HistoricalChart(id, days, currentData.name));
          const data = await response.json();
          return data.prices;
        };

        const { data, status } = useQuery(["coinChart", id], fetchCoinChart);
        console.log(data)
  return (
    <div
      className="flex flex-col w-full 
    mt-10 px-2 md:px-0"
    >
      {/* Chart */}
      {status === "loading" ? (
        <LinearProgress
          style={{ backgroundColor: "gold" }}
          className="container mx-auto"
        />
      ) : (
        <div className="p-42 mt-2 w-full">
          <Line
            data={{
              labels: data?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getTime() > 12
                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                    : `${date.getHours()} : ${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: data?.map((coin) => coin[1]),
                  label: `price (past ${days} Days) in ${currentData.name}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {chartDays.map((data) => {
          return (
            <button
              className={`border-2 border-green-500 p-2 m-2 ${
                days === data.value ? "text-black bg-green-500" : "text-white"
              } hover:bg-green-500`}
              key={data.value}
              onClick={() => setDays(data.value)}
            >
              {data.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CoinChart