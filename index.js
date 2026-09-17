// Selectores
const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#crypto");
const amount = document.querySelector("#amount");

// 1. Agregamos 'async' antes de 'e =>'
form.addEventListener("submit", async e => {
  e.preventDefault();

  // Tip: Puedes usar directamente crypto.value y coin.value
  const cryptoSelected = [...crypto.children].find(option => option.selected).value;
  const coinSelected = [...coin.children].find(option => option.selected).value;
  const amountValue = amount.value;

  try {
    // 2. Primer await: realiza la petición a la API de Binance
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoSelected}${coinSelected}`);
    
    // 3. Segundo await: parsea la respuesta a un objeto JSON
    const data = await response.json();

    // Mostramos los datos obtenidos
  console.log("Precio actual:", data.lastPrice);
  console.log("Precio más alto 24h:", data.highPrice);
  console.log("Precio más bajo 24h:", data.lowPrice);
  console.log("Variación % 24h:", data.priceChangePercent);

  } catch (error) {
    console.log("Error en la petición:", error);
  }
});

