import React from 'react'
import { useGlobalContext } from "../Context/CryptoContext";


const CoinsTable = () => {
      const { statusValue, coinList } = useGlobalContext();

      if (statusValue === 'success') {
          console.log(coinList)
      }

  return (
    <div>CoinsTable</div>
  )
}

export default CoinsTable