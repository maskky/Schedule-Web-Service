# WPM : World Business Partnership Management
A web-service for WPM application

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
