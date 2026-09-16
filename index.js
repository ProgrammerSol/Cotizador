//Selectores
const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto= document.querySelector("#crypto");
const amount= document.querySelector("#amount");
  
form.addEventListener("submit", e => { // 1. Evita que la página se recargue automáticamente
 e.preventDefault();
 const cryptoSelected = [...crypto.children].find(option => option.selected).value;
 const coinSelected = [...coin.children].find(option => option.selected).value;
 const amountValue = amount.value;
 console.log(coinSelected, cryptoSelected, amountValue);
});

