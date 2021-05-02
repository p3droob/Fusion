const os = require('os-utils');

os.cpuUsage((v) => {
    console.log(`CPU Usage (%): ${v}%`);
});