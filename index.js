// Selectores
const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#crypto");
const amount = document.querySelector("#amount");
const coinInf = document.querySelector("#coin-inf");

// 1. Agregamos 'async' antes de 'e =>'
form.addEventListener("submit", async e => {
  e.preventDefault();

  // Tip: Puedes usar directamente crypto.value y coin.value
  const cryptoSelected = [...crypto.children].find(option => option.selected).value;
  const coinSelected = [...coin.children].find(option => option.selected).value;
  const amountValue = amount.value;

  const currencySymbols = {
  USD: "$",
  EUR: "€",
  ARS: "$",  // O puedes poner "ARS $" si prefieres distinguirlo
  VES: "Bs."
};

coinInf.innerHTML = `<span class="loader"></span>`;

  try {
    
    // 2. Primer await: realiza la petición a la API de Binance
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoSelected}${coinSelected}`);
    
    // 3. Segundo await: parsea la respuesta a un objeto JSON
    const data = await response.json();

    // Mostramos los datos obtenidos
  const price = ("Precio actual:", data.lastPrice);
  const priceHigh = ("Precio más alto 24h:", data.highPrice);
  const priceLow = ("Precio más bajo 24h:", data.lowPrice);
  const variation = ("Variación % 24h:", data.priceChangePercent);
  const symbol = currencySymbols[coinSelected] || coinSelected;

  if(amountValue !== ``) {
    const result = Number (amountValue) / ("Precio actual:", data.lastPrice);
    coinInf.innerHTML = `
    <p class="info">El Precio es: <span class="price">${symbol} ${price}</span></p>
    <p class="info">El Precio mas alto es:<span class="price">${symbol} ${priceHigh}</span></p>
    <p class="info">El Precio mas bajo es:<span class="price">${symbol} ${priceLow}</span></p>
    <p class="info">Variacion 24HR: <span class="price">${variation}%</span></p>
    <p class="info">Puedo comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected} </span></p>
  `;
  } else {
    coinInf.innerHTML = `
    <p class="info">El Precio es: <span class="price">${symbol}${price}</span></p>
    <p class="info">El Precio mas alto es:<span class="price">${symbol} ${priceHigh}</span></p>
    <p class="info">El Precio mas bajo es:<span class="price">${symbol} ${priceLow}</span></p>
    <p class="info">Variacion 24HR: <span class="price">${variation}%</span></p>
  `;
  }


  } catch (error) {
    console.log("Error en la petición:", error);
  }
}); 

