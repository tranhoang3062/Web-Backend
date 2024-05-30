require('dotenv').config();
const fs = require("fs");

const unlinkFiles = (data = '') => {
    if (data.indexOf('[') != -1 && data.indexOf(']') != -1) {
        const files = JSON.parse(data);
        files.forEach(file => {
            const path = 'public' + file.replace(`http://${process.env.HOST_DB}:${process.env.PORT_SERVER}`, '');
            fs.stat(path, (err, stats) => {
                if (!err) {
                    fs.unlink(path, (err) => { });
                }
            });
        });
    } else {
        const path = 'public' + data.replace(`http://${process.env.HOST_DB}:${process.env.PORT_SERVER}`, '');
        fs.stat(path, (err, stats) => {
            if (!err) {
                fs.unlink(path, (err) => { });
            }
        });
    }
}

module.exports = unlinkFiles;