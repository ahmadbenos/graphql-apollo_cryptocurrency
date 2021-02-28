import React from "react";
import { gql, useQuery } from "@apollo/client";

const COIN_QUERY = gql`
  query CoinQuery($id: Int!) {
    coin(id: $id) {
      name
      symbol
      tsupply
      id
    }
  }
`;

const CoinDetails = () => {
  return <div>hey</div>;
};

export default CoinDetails;
