import React from "react";
import { gql, useQuery } from "@apollo/client";
import { arrowColor } from "./CoinItem";
import { Link } from "react-router-dom";

const COIN_QUERY = gql`
  query CoinQuery($id: Int!) {
    coin(id: $id) {
      name
      symbol
      tsupply
      price_usd
      percent_change_24h
      msupply
      volume24
      market_cap_usd
    }
  }
`;

const CoinDetails = ({ match }) => {
  const { id } = match.params;
  const { loading, error, data } = useQuery(COIN_QUERY, {
    variables: {
      id: Number(id),
    },
  });
  if (loading) return <h4>Loading...</h4>;
  if (error) return <p>An error has occured</p>;
  if (data) console.log(data);
  const {
    name,
    symbol,
    tsupply,
    price_usd,
    percent_change_24h,
    msupply,
    volume24,
    market_cap_usd,
  } = data.coin;

  return (
    <>
      <h3>{name}</h3>
      <div className="card text-white bg-primary mb-3">
        <div className="card-body">
          <h4 className="card-title">${price_usd}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-primary">
              Market Cap: ${market_cap_usd.toLocaleString()}
            </li>
            <li className="list-group-item bg-primary">
              Price Change 24h:{" "}
              <span style={{ color: arrowColor(percent_change_24h) }}>
                {percent_change_24h}%
              </span>
            </li>
            <li className="list-group-item bg-primary">
              Volume: ${volume24.toLocaleString()}
            </li>
            <li className="list-group-item bg-primary">
              Total Supply:{" "}
              {msupply == 0 ? "Unlimited" : Number(msupply).toLocaleString()}
            </li>
            <li className="list-group-item bg-primary">
              Circulating Supply: {Number(tsupply).toLocaleString()}
            </li>
            <li className="list-group-item bg-primary">Symbol: {symbol}</li>
          </ul>
        </div>
      </div>
      <Link to="/" className="btn btn-outline-primary mt-3">
        Back
      </Link>
    </>
  );
};

export default CoinDetails;
