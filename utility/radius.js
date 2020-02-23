const fetch = require('node-fetch');

const getRadius = location => {
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=mRGIS9ZyQMJLK0yTrevldrU457tstO1Z&json={"location":{"street":"${location}"},"options":{"thumbMaps":false}}`;
  fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    json: {
      location: {
        street: 'pulchowk,kathmandu'
      }
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log(data.results[0].locations);
        return data.results[0].locations;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = { getRadius };
