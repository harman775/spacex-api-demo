const https = require('https');

// Callback
function getLaunchWithCallback(callback) {
  https.get('https://api.spacexdata.com/v5/launches/latest', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, JSON.parse(data)));
  }).on('error', err => callback(err));
}

// Promise
function getLaunchWithPromise() {
  return new Promise((resolve, reject) => {
    https.get('https://api.spacexdata.com/v5/launches/latest', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', err => reject(err));
  });
}

// Async/Await
async function getLaunchWithAsyncAwait() {
  const response = await getLaunchWithPromise();
  return response;
}

// Run all three
getLaunchWithCallback((err, data) => {
  if (err) console.error('Callback Error:', err);
  else console.log('Callback Result:', data.name);
});

getLaunchWithPromise()
  .then(data => console.log('Promise Result:', data.name))
  .catch(err => console.error('Promise Error:', err));

(async () => {
  try {
    const data = await getLaunchWithAsyncAwait();
    console.log('Async/Await Result:', data.name);
  } catch (err) {
    console.error('Async/Await Error:', err);
  }
})();
