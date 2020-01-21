let express = require("express"),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    filesys = require('./files\\filesys'),
    sys = require('./files\\sys'),
    log = require('./files\\logger');

let SERVERCONFIG = require('./configs\\server-config.json');
let EMAILCONFIG = require('./configs\\email-config.json');

var filePosition = 0;

let noErrorFound = false;

let goDelete = false;

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function sendEmail(){
    fs.readdir(SERVERCONFIG.bufferDir, (err, files)=>{
        if(err){
            log.logError('UPS! Buffer Directory!');
            goDelete = false;
            return console.log('UPS! Buffer Directory! ' + err);
        }else{
            if(files.length){
                let errorReturned = fs.rename(SERVERCONFIG.bufferDir + '\\' + files[filePosition], SERVERCONFIG.bufferDirName + '\\' + files[filePosition], (err, data) =>{
                    if(err){
                        log.logError('UPS! File Error!');
                        console.log('UPS! File Error!');
                        filePosition++;
                        goDelete = false;
                        noErrorFound = false;
                        if(filePosition >= files.length)
                            filePosition = 0;
                        return;
                    }

                    noErrorFound = true;
                    goDelete = true;

                    if(noErrorFound){
                        let rawData = fs.readFile(SERVERCONFIG,bufferDir + '\\' + files[filePosition], (err, data) => {
                            if(err){
                                log.logError('UPS! File Directory');
                                goDelete = false;
                                return console.log('UPS! File Directory');
                            }

                            var email = JSON.parse(data);
                            let transporter = nodeMailer.createTransport({
                                host: EMAILCONFIG.host,
                                port: EMAILCONFIG.port,
                                // add auth or not secure
                            });

                            let mailOptions = {
                                to: email.to,
                                from: email.from,
                                subject: email.subject,
                                text: email.text,
                                html: email.html,
                                cc: email.cc
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if(error){
                                    log.logError('UPS! Sending Email!');
                                    goDelete = false;
                                    return console.log('UPS! Sending Email!' + err);
                                }
                            });

                            if(goDelete){
                                console.log("Deleted");
                                filesys.deleteFile(SERVERCONFIG.bufferDir + '\\' + files[filePosition]);
                            }

                            console.log('Sending email Completed!');

                            filePosition = 0;
                            return;
                        });
                    }
                });
            }else{
                return console.log('Empty Folder');
            }
        }
    });
}

let server = app.listen(SERVERCONFIG.port, () => {
    setInterval(sendEmail, sys.getRandomInt(SERVERCONFIG.minSec, SERVERCONFIG.maxSec));
    console.log('Port' + SERVERCONFIG.port);
});