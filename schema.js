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
        
         // there isn't any res variable in the catch(below this line) but i just wanted graphql to send an error, pretty sure not a good practice but worked in the first place lmao.
        // so that i use if(error) in the client side(apollo). I just didn't want to return an object with an error and a message with it(example: {err: "an error occured"})
        // kinda lazy but forcing graphql to send an error was quicker than handling my own error object and handling it in the client side and doing if(data.err) lol
          .catch((err) => res.send({ err: "an error has occured" }));
      },
    },

    coin: {
      type: CoinType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(value, args) {
        return axios
          .get(`https://api.coinlore.net/api/ticker/?id=${args.id}`)
          .then((res) => res.data[0])
        
        // same thing here as said above, no res variable, just forcing graphql to send an error to directly use if(error) in apollo
          .catch((err) => res.send({ err: "an error occured" }));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: BaseQuery,
  // to use a mutation, you have to add mutation key in this object, mutation
  // is basically a graphql object type as well
});
