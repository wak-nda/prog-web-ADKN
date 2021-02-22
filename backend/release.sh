PATH="/home/godzilla/.nvm/versions/node/v12.16.3/bin:$PATH"

npm install

pm2 stop backendreact

pm2 delete backendreact

pm2 start app.js --name "backendreact"
