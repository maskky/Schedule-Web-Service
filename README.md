A Schedule Web Service created from NodeJS + ExpressJS 

## Require
  * NodeJS  v.10.x.x
  * MongoDB v.4.x.x

## Installation
  Install dependencies
  ```
  sudo npm i
  ```
  Install PM2
  ```
  sudo npm i -g pm2
  ```
  Install NGROK
  ```
  sudo npm i -g ngrok
  ```
## How to run
  Start index.js with PM2
  ```
  pm2 start ecosystem.config.js
  ```
  Start NGROK to give access to your localhost
  ```
  ngrok http _port_
  ```

## If error bcrypt
  Install node-pre-gyp
  ```
  npm install -g node-gyp node-pre-gyp
  ```
  Then re-install bcrypt
  ```
  npm install bcrypt --unsafe-perm
  ```
  
## Environments
  export / set
  ```
  NODE_ENV=production
  ```
  ```
  wpm_db=_mongodbURL_ // mongodb://localhost:27017/wpm
  ```
  ```
  wpm_jwtPrivateKey=_yourPrivateKey_ //1234
  ```

### PM2 Commands
  * [start][stop][reload][delete]
  * [CMD] pm2 kill -> to kill process if pm2 can't start.
