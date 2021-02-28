const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");
const GraphQLLong = require("graphql-type-long");
const axios = require("axios").default;

const CoinType = new GraphQLObjectType({
  name: "CoinType",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    symbol: { type: GraphQLString },
    price_usd: { type: GraphQLFloat },
    percent_change_24h: { type: GraphQLFloat },
    msupply: { type: GraphQLString },
    tsupply: { type: GraphQLString },
    market_cap_usd: { type: GraphQLLong },
    volume24: { type: GraphQLLong },
  },
});

const BaseQuery = new GraphQLObjectType({
  name: "BaseQuery",
  fields: {
    coins: {
      type: new GraphQLList(CoinType),
      resolve(value, args) {
        return axios
          .get("https://api.coinlore.net/api/tickers/?start=0&limit=10")
          .then((res) => res.data.data)
          .catch((err) => console.log(err));
      },
    },
    // The following field is just to demonstrate getting a specific coin
    // using graphql args, the GraphQLNonNull, and resolver function, so it's not actually
    // used in this web app!
    coin: {
      type: CoinType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(value, args) {
        return axios
          .get(`https://api.coinlore.net/api/ticker/?id=${args.id}`)
          .then((res) => res.data[0])
          .catch((err) => console.log(err));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: BaseQuery,
  // to use a mutation, you have to add mutation key in this object, mutation
  // is basically a graphql object type as well
});
