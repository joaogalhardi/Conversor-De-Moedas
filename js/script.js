const form = document.querySelector("form");
const buttonForm = form.querySelector("#btn");
const inputForm = document.querySelector("#real");
const inputCoins = document.querySelectorAll(".moedasGlobais");
const result = document.querySelector("#resultado");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let typeCoin;
  const inputValue = Number(inputForm.value);  // este é o primeiro input

  inputCoins.forEach((element) => {   // este é o segundo input
    if (element.checked) {
      typeCoin = element.value;
    }
  });

  const converter = async (typeCoin, region = false) => {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/last/" + typeCoin
    );
    const data = await response.json();

    const keyPrice = typeCoin.replace("-", "");
    const priceNumber = Number(data[keyPrice].low);

    const valor = inputValue / priceNumber;

    if (!region) {
      const valorFinal = valor.toFixed(2);
      result.innerText = valorFinal;
    } else {
      const moedaFormatada = valor.toLocaleString(region, {
        style: "currency",
        currency: data[keyPrice].code
      });
      result.innerText = moedaFormatada;
    }
  };

  switch (typeCoin) {
    case "dolar":
      converter("USD-BRL", "en-US");
      break;
    case "euro":
      converter("EUR-BRL", "de-DE");
      break;
    case "libra":
      converter("GBP-BRL", "en-GB");
      break;
    case "bitcoin":
      converter("BTC-BRL");
      break;
  }
});