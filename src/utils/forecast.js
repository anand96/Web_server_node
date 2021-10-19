// Destructing property shorthand is used
const request = require('request')

const forecast = (latitude, longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aee53cee1d0fc67b3d713c2196709625&query='+ latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body } ) => {
        if (error)
        {
            callback('Unable to connect to location services', undefined)   
        }else if (body.error)
        {
            callback('Unable to connect to forecast services', undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature +' degree out. There is a '+ body.current.feelslike + ' change precipication')
        }
    })
}

module.exports = forecast

