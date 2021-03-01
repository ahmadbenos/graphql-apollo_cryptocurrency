import React from "react";

const Header = () => {
  return (
    <>
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
    </>
  );
};

export default Header;
