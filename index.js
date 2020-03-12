const { nextISSTimesForMyLocation } = require('./iss');

const passTimes = data => {
  for (let times of data) {
    const date = new Date(0);
    date.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  passTimes(data);
});
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('207.164.58.134', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP geolocation:' , data);
// });

// const example = { latitude: '43.84860', longitude: '-79.26170'}
// fetchISSFlyOverTimes(example, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:', data);
// });