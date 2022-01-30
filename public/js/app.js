// handle form submissions
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = document.querySelector("input").value;
  const MessageOne = document.querySelector("#message-1");
  const MessageTwo = document.querySelector("#message-2");
  MessageOne.textContent = "Loading...";
  MessageTwo.textContent = "";

  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        MessageOne.textContent = data.error;
        MessageTwo.textContent = "";
      } else {
        MessageOne.textContent = data.location;
        MessageTwo.textContent = data.forecast.forecast;
      }
    });
  });
});
