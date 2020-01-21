# Send Emails App
This was my first time really developing something with nodeJS.
Might have errors and bugs because this version it's not completed.

## How it works
This app was built to work as a service.

It is constantly checking a folder for JSON files with the email info, from first file on folder to the last.

If there are no errors then the email is sent.

If an email has an error, then the app is supposed to skip it and reset the folder.

It will be trying everytime to send the bugged email until the user fixes it.

## Requirements
- [Nodemailer](https://github.com/nodemailer/nodemailer)
