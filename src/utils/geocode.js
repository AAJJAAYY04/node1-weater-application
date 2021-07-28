const request = require('request');

const getcode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWFqamFheXkiLCJhIjoiY2tvaDMzamhuMGxlcTJucGw0bWJ2Znd4bSJ9.4By6FfY_Zu_ZFpndLICq0A';

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location, Try another one', undefined);
        } else {
            callback(undefined, {
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = getcode;