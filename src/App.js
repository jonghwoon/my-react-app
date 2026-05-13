import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        if (json.length > 0) {
          setSelectedPrice(json[0].quotes.USD.price);
        }
        setLoading(false);
      });
  }, []);

  const onAmountChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setAmount(0);
    } else {
      setAmount(parseFloat(value));
    }
  };

  const onSelectChange = (event) => {
    setSelectedPrice(parseFloat(event.target.value));
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <select onChange={onSelectChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          <div>
            <input
              value={amount === 0 ? "" : amount}
              onChange={onAmountChange}
              type="number"
              placeholder="Enter your USD"
            />{" "}
            USD
          </div>

          <h3>
            I can buy:{" "}
            {selectedPrice > 0 ? (amount / selectedPrice).toFixed(6) : 0} units
          </h3>
        </>
      )}
    </div>
  );
}

export default App;
