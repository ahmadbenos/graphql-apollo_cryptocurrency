import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <h1 className="text-center mt-2">Crypto Prices</h1>
          <p className="text-center">
            React, GraphQL, Apollo, and coinlore(API) project
          </p>
          <p className="text-center">
            <a href="https://github.com/ahmadbenos/graphql-apollo_cryptocurrency">
              By Ahmad Tarabein
              <span>
                <i class="fab fa-github"></i>
              </span>
            </a>
          </p>
          <Route path="/" exact component={Coins} />
          <Route path="/details/:id" component={CoinDetails} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
