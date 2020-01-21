let fs = require('fs');

const makeDir = dir => {
    fs.mkdir(dir, {
        recursive: true
    }, (err) => {
        if(err) return console.log('UPS! Not able to make dir: ', dir);
    });
}

module.exports = {
    makeDir,

    startDirs: (bufferDir) => [bufferDir, "./utils", "./utils/logs"].map(makeDir),

    deleteFile: (filePath) => {
        fs.access(filePath, err => {
            if(!err){
                fs.unlink(filePath, err => {
                    if(err){
                        return console.log(err);
                    }
                    return console.log("Deleted: ", filePath);
                })
            }else{
                return console.log(err);
            }
        });
    }
};