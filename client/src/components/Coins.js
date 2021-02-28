import React from "react";
import { useQuery, gql } from "@apollo/client";
import CoinItem from "./CoinItem";

const COINS_QUERY = gql`
  query CoinsQuery {
    coins {
      name
      symbol
      price_usd
      percent_change_24h
    }
  }
`;

const Coins = () => {
  const { loading, error, data } = useQuery(COINS_QUERY);
  function RenderList() {
    if (loading) return <h4>Loading...</h4>;
    if (error) return <p>An error occured!</p>;
    console.log(data.coins);
    return data.coins.map((coin) => (
      <CoinItem key={Math.random()} coin={coin} />
    ));
  }
  return (
    <div>
      <h2>All Coins</h2>
      <hr />
      <RenderList />
    </div>
  );
};

export default Coins;
