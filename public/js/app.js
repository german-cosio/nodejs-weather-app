// handle form submissions
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = document.querySelector("input").value;
  const MessageOne = document.querySelector("#message-1");
  const MessageTwo = document.querySelector("#message-2");
  const MessageIcon = document.querySelector("#message-icon");
  MessageOne.textContent = "Loading...";
  MessageTwo.textContent = "";
  MessageIcon.style.visibility = 'visible';
  MessageIcon.src = "../img/loading.gif";

  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        MessageOne.textContent = data.error;
        MessageTwo.textContent = "";
        MessageIcon.style.visibility = 'visible';
        MessageIcon.src = "../img/error.png";
      } else {
        MessageOne.textContent = data.location;
        MessageTwo.textContent = data.forecast.forecast;
        MessageIcon.src = data.forecast.weather_icon;
        MessageIcon.style.visibility = 'visible';
      }
    });
  });
});
