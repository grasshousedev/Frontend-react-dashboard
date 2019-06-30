var path = require('path');

module.exports = {
    modify: (config, { webpackEnv }) => {
        config.resolve.modules.unshift(path.resolve(__dirname, './src'));
        console.log('Using this Webpack Config');
        console.log(config);
        return config;
    },
};