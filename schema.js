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
        
         // In the .catch() below, I returned an object instead of an array to force graphql to send error just so that i directly handle the error in the client side(apollo)
        // by doing if(error), probably not a good practice but it worked on the first try lmao.(can be done much better of course by return an array with an object etc...)
          .catch((err) => ({ err: "an error has occured" }));
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
        
        // same strategy here as above, but this time i added an undefined variable(res) to also force graphql in sending an error.
        // CoinType is an object, so returning an array should make graphql send an error, but it didn't idk why. so i ended up just making things weird
        // and did this res.send which doesnt even exist lmao. Of course error handling is done in a proper way as i do in all my other projects but it actually works this
        // way and i kept it. Will definetly handle errors in the correct way next time. 
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
