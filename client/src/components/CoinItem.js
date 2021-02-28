import React from "react";

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
            style={{
              color: arrowColor(percent_change_24h),
            }}
          ></i>
          {percent_change_24h}%
        </span>
      </div>
      <div className="card-body">
        <h4 className="card-title">Primary card title</h4>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default CoinItem;
