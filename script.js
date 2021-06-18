const amount = document.getElementById("calculator__provided--amount");
const currency = document.getElementById("calculator__currency--id");
const convert = document.getElementById("calculator__convert--btn");
const outcome = document.getElementById("outcome");
let amountToConvert = 0;
let selectedCurrencyRate = 0;

fetch("http://api.nbp.pl/api/exchangerates/tables/C/")
  .then((data) => data.json())
  .then((data) => {
    const tables = data[0];
    let myRates = tables.rates.filter(
      (rate) =>
        rate.code === "EUR" || rate.code === "USD" || rate.code === "CHF"
    );
    for (const element of myRates) {
      console.log(element);
      currency.innerHTML += `<option value="${element.bid}">${element.code}</option>`;
      currency.addEventListener("change", (event) => {
        selectedCurrencyRate = `${event.target.value}`;
      });
      amount.addEventListener("change", (event) => {
        amountToConvert = amount.value;
      });
    }
    convert.addEventListener("click", function () {
      let convertedAmount = amountToConvert * selectedCurrencyRate;
      console.log(selectedCurrencyRate);
      console.log(convertedAmount);
      if (selectedCurrencyRate === 0) {
        outcome.innerHTML = `<p>Please select currency!</p>`;
      } else if (amountToConvert == "") {
        outcome.innerHTML = `<p>Please provide the amount to convert!</p>`;
      } else {
        outcome.innerHTML = `<p>It's ${convertedAmount.toFixed(2)} PLN</p>`;
      }
    });
  });
