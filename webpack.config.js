const path = require('path');

const config = {
    entry : './srcClients/index.js', // File đầu vào
    output : { // File đầu ra
        filename : 'bundle.js', // Tên file đầu ra
        path : path.resolve(__dirname, 'public') // Nơi chưa file đầu ra
    }
}

module.exports = config;
