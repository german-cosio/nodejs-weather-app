const request = require("request");

const getForecast = (latitude, longitude, callback) => {
  if (latitude === undefined || longitude === undefined) {
    callback(
      "Unable to fetch response.(wrong latitude or longitude)",
      undefined
    );
  } else {
    const url = `http://api.weatherstack.com/current?access_key=da5ac66bf39a7cc05330c595c4f3af03&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback("Unable to connect to location services!", undefined);
      } else if (body.error) {
        callback(
          "Unable to fetch response from forecast API. Error message " +
          body.error.info + ".URL: " + url,
          undefined
        );
      } else {
        callback(undefined, {
          forecast:
            body.current.weather_descriptions +
            ". It is currently " +
            body.current.temperature +
            " degrees out. There is a " +
            body.current.precip +
            "% chance of rain.",
        });
      }
    });
  }
};

module.exports.getForecast = getForecast;
