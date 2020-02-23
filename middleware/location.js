const publicIp = require('public-ip');
const iplocation = require("iplocation").default;

const getLatLon = async (ip) => {
  let result = await iplocation(ip);
  return result;
  // console.log('async result is: ' + result);
}

module.exports = {
  getLatLon: function (ip) { return getLatLon(ip); }
}
