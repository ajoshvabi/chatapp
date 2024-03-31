
// const process = require('process');
// const cp = require('child_process');
// const fs = require('fs');

// const refreshdata = () => {
//     console.log("start refresh");
//     var server = cp.fork('server.js');
//     console.log('Server started');
    
//     fs.watchFile('server.js', function (event, filename) {
//         server.kill();
//         console.log('Server stopped');
//         server = cp.fork('server.js');
//         console.log('Server started');
//     });
    
//     process.on('SIGINT', function () {
//         server.kill();
//         fs.unwatchFile('server.js');
//         process.exit();
//     });
// }

// module.exports = refreshdata;

// refreshdata.js

const cp = require('child_process');

const refreshdata = () => {
  return new Promise((resolve, reject) => {
    // Implement your refresh logic here

    // For simplicity, we'll just restart the server
    const newServer = cp.fork('server.js');

    // Handle the 'disconnect' event to know when the new server is ready
    newServer.on('disconnect', () => {
      console.log('Server refreshed successfully');
      resolve(newServer);
    });

    // Handle errors
    newServer.on('error', (err) => {
      console.error('Error refreshing server:', err);
      reject(err);
    });
  });
};

module.exports = refreshdata;

