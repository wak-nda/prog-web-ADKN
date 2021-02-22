PATH="/home/godzilla/.nvm/versions/node/v12.16.3/bin:$PATH"

npm install

pm2 stop backend

pm2 delete backend

pm2 start app.js --name "backend" --instances 1 --max-restarts 5
