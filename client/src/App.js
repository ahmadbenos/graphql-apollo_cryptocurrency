import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Coins from "./components/Coins";

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
          <Route path="/" exact component={Coins} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
