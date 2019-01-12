# dashboard

Hi! 

This is my private dashboard. The goal of this project is to have a place to collect my web applications, independently on the technology. 

The Dashboard itself is built in React, but each application might be built with other frameworks (like Vue) and the backend can be different for every application.

# Install and run

```sh
# Install packages
yarn

# Start development, by default listening on 3000
yarn start

# Create production bundle
yarn build
```

To test build package, user a local web server. 
One easy way is to use `http-server` package:
```sh
# Install the node package, globally or locally
sudo npm install http-server -g

# Run from main directory
http-server build/
```
This will create a local server listening on port 8080.

# Credits

Main developer: Vittorio Zamboni.