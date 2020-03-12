const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(`Failed to request due to ${error}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    if (body) {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(`Failed to request due to ${error}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }
    const geoloc = {};
    geoloc["latitude"] = JSON.parse(body).data.latitude;
    geoloc["longitude"] = JSON.parse(body).data.longitude;
    if (body) {
      callback(null, geoloc);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(`Failed to request due to ${error}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching ISS pass times. Response: ${body}`), null);
      return;
    }
    if (body) {
      callback(null, JSON.parse(body).response);
    }
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(`Failed to request due to ${error}`, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(`Failed to request due to ${error}`, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) {
          callback(`Failed to request due to ${error}`, null);
          return;
        }
        callback(null, data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };