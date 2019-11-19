
module.exports = {
    modify: (config, { webpackEnv }) => {
        // Add ./src content as first, if not using jsconfig.json
        // const path = require('path');
        // config.resolve.modules.unshift(path.resolve(__dirname, './src'));

        // List of external repositories that have to be added
        // to the testers to being correctly processed
        // const externalRepositories = [
        //   '/home/<user>/repositories/stand-alone-repo',
        // ];
        let externalRepositories = [];
        if (process.env.REACT_APP_EXTERNAL_REPOSITORIES) {
          externalRepositories = process.env.REACT_APP_EXTERNAL_REPOSITORIES.split(',');
        }

        // Set a list of repositories required for this project
        const projectRepositories = [
          'dashboard-finance'
        ];

        // Validate the user has set all of them before starting
        projectRepositories.forEach(repo => {
          if (externalRepositories.filter(eRepo => eRepo.endsWith(repo)).length !== 1)
            throw new Error(`==> Repository ${repo} must be included in .env.local REACT_APP_EXTERNAL_REPOSITORIES variable`);
        });

        config.module.rules[2].oneOf.forEach((test, index) => {
          if (test.include) {
            config.module.rules[2].oneOf[index].include = [
              ...(Array.isArray(test.include) ? test.include : [test.include]),
              ...externalRepositories,
            ];
            config.module.rules[2].oneOf[index].exclude = [
              ...(Array.isArray(test.exclude) ? test.exclude : [test.exclude]),
              ...externalRepositories.map(repo => `${repo}/node_modules/**`),
            ].filter(r => !!r);
          }
        });
        return config;
    },
};
