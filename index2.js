const { nextISSTimesForMyLocation } = require('./iss_promised');
const { passTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((data) => {
    passTimes(data);
  })