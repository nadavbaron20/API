let previousPrice = 0;

setTimeout(updateTicker, 5000);
function updateTicker() {
  let APIRequest = fetch("https://data.binance.com/api/v3/ticker/24hr");

  APIRequest.then((response) => response.json())
    .then((data) => findBTCUSDTObject(data))
    .then((BTCUSDTObject) => compareToLastPrice(BTCUSDTObject))
    .then((lastPrice) => printToHTML(lastPrice));

  setTimeout(updateTicker, 5000);
}

function findBTCUSDTObject(data) {
  let BTCUSDT;
  BTCUSDT = data.find((element) => element.symbol == "BTCUSDT");
  BTCUSDT = BTCUSDT.lastPrice;
  return BTCUSDT;
}

function compareToLastPrice(BTCUSDT) {
  if (BTCUSDT >= previousPrice) {
    document.getElementById("screen").style.color = "green";
  } else {
    document.getElementById("screen").style.color = "red";
  }
  previousPrice = BTCUSDT;
  return BTCUSDT;
}

function printToHTML(price) {
  document.getElementById("screen").innerText = price;
}
