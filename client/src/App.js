import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
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
          <Header />
          <Route path="/" exact component={Coins} />
          <Route path="/details/:id" component={CoinDetails} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
