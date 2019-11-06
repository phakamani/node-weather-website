
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/8091dd34c01b9ad8609239f627f7d39f/${latitude},${longitude}?units=si&lang=en`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback(error, undefined);
        } else {
            let weatherDesscription = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`;
            weatherDesscription = `${weatherDesscription}. The minimum daily temperature is ${body.daily.data[0].temperatureLow} degrees and the maximum is ${body.daily.data[0].temperatureHigh} degrees`
            callback(undefined, weatherDesscription);
        }
    })
}

module.exports = forecast;

