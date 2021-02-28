import React from "react";
import { Link } from "react-router-dom";

// function to check the price to determine arrow color
function arrowColor(change) {
  if (change > 0) return "green";
  if (change < 0) return "red";
  return "white";
}

const CoinItem = ({
  coin: { name, symbol, price_usd, percent_change_24h },
}) => {
  return (
    <div className="card text-white bg-primary mb-3">
      <div className="card-header">
        {symbol}
        <span
          style={{
            position: "relative",
            left: "3px",
            color: arrowColor(percent_change_24h),
          }}
        >
          <i
            className={`fas fa-lg ${
              percent_change_24h < 0 ? "fa-caret-down" : "fa-caret-up"
            }`}
          ></i>
          {percent_change_24h}%
        </span>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-10">
            <h4 className="card-title">{name}</h4>
            <p className="card-text">${price_usd.toLocaleString()}</p>
          </div>
          <div className="col-md-2 mt-1">
            <Link to="/details" className="btn btn-outline-info">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinItem;
