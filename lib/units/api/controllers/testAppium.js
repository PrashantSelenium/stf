var spawn = require('child_process').spawn;
// var net = require('net');
var fp = require("find-free-port")
var appium;

function startAppium() {
  fp(4723, function(appiumPortErr, appiumPort) {
    if (appiumPortErr) console.log(appiumPortErr);

    fp(appiumPort+1, function(boostrapPortErr, bootstrapPort) {
      if (boostrapPortErr) console.log(boostrapPortErr);

      appium = spawn('appium', ['-p', appiumPort, '-bp', bootstrapPort]);

      appium.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      appium.stderr.on('data', (data) => {
        console.log(`ps stderr: ${data}`);
      });

      appium.on('close', (code) => {
        if (code !== 0) {
          console.log(`ps process exited with code ${code}`);
        }
      });
    });
  });
  // appium = spawn('appium');
}

function stopAppium() {
  appium.kill('SIGHUP');
}

startAppium();

setTimeout(startAppium, 10000);
setTimeout(stopAppium, 10000);
setTimeout(stopAppium, 10000);
// var port;

// fp(4723, function(err, freePort) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(freePort);
// });

// console.log(port);
