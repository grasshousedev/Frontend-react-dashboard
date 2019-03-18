# dashboard

Hi! 

This is my private dashboard. The goal of this project is to have a place to collect my web applications, independently on the technology. 

The Dashboard itself is built in React, but each application might be built with other frameworks (like Vue) and the backend can be different for every application.

# Install and run

Clone dependency repositories:

```sh
# Assuming you are in your ~/repositories folder, clone

# dashboard-ui-style (mandatory)
git clone git@github.com:vittoriozamboni/dashboard-ui-style.git
cd dashboard-ui-style
yarn link
cd ../

# dashboard-finance (optional)
git clone git@github.com:vittoriozamboni/dashboard-finance.git
cd dashboard-finance
yarn link
cd ../

```

From main folder of this repository, now install all global dependencies and link local ones:

```sh
# Install packages
yarn

# Local packages
yarn link "@vzamboni/dashboard-ui-style"

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

# Dashboard blocks

## DashboardMenu
`DashboardMenu` component allows to create menus in the dashboard header.
There are few blocks used:
```
-- container (class: dashboard-menu__container) --------------------
| -- header (class: dashboard-menu__header) ---------------------- |
| | -- header block (class: dashboard-menu__header-block) ------ | |
| | | -- block item (class: dashboard-menu__header-item) ------| | |
| | |----------------------------------------------------------| | |
| |--------------------------------------------------------------| |
| -- body (class: dashboard-menu__body) -------------------------- |
| |--------------------------------------------------------------| |
--------------------------------------------------------------------
```

DashboardMenu accepts three block props, whose names are defined in `constants` file: `left`, `center` and `right`.
Each of them defines a specific part of the header, and accepted properties must be valid React nodes or strings, or an array of any of them.
Based on the passed props, the size of each blocks is calculated in percentages: for example, if only `left` and `right` are passed, each of them is 50%. Plus, text align is set as the name of the property itself.

```js
import { DashboardMenu } from 'components/dashboard-menu/DashboardMenu';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

function Header() {
    return <DashboardMenu
        left={['Menu Item 1', 'Menu Item 2']}
        center='Dashboard'
        right={<RightComponent />}
    />
}
```

Dashboard Menu has a special section called `body`. It represents an invisible (until opened) section that can be filled with a component. 
In order to be used, a special type of object should be passed in a block. It must have at least two keys, `headerLabel` and `bodyItem`. 
The first is a string or a component that will be rendered in the header; when `headerLabel` is clicked the second will be
rendered inside the body (the hidden part).
This should extend `DashboardItem` component, which will receive few props from DashboardMenu itself.
```js
import React, { Component } from 'react';
import { DashboardMenu, DashboardItem } from 'components/dashboard-menu/DashboardMenu';

const RightComponent = () => {
    return <span>Hello User!</span>;
};

class Applications extends DashboardItem {
    render() {
        const { query } = this.props;

        return <div>
            This will be the list of installed applications! Query: {query}
        </div>;
    }
}

export class Header extends Component {
    render() {
        return <header>
            <DashboardMenu
                left={[{ headerLabel: 'Applications', bodyItem: Applications }, 'Menu Item 2']}
                center='Dashboard'
                right={<RightComponent />}
            />
        </header>;
    }
}
```

# Store

Store management is implemented by using `redux`.
An empty store is created inside `store/store.js` file with a mechanism to add reducers dynamically by using the following command:

```js
store.registerReducer(STORE_KEY, REDUCER_FUNCTION);
```

Whenever a new reducer is registered, the `store` will replace all the reducers using `replaceReducer` method adding the new one as well.

Example used in the application:

```js
store.registerReducer('authentication', authReducers.authentication);
```


# Libs

## Requests
`requests` is a module based on `fetch` that simplifies calls by adding headers and payload conversion facilitations. There are two shorthands: `get` and `post`. 

For a more detailed description, see README.md file in `libs/requests` folder.

## Exceptions
Provides a simple error class called `Exception` that takes an object when instanciated and stores it in `errorData`. This can be retrieved by using `getErrorData` method.

## Authentication
`authentication` module helps to authenticate the user on server.
The idea is to have a valid token and store it locally after a successfull login by using localStorage.
When the page is loaded the first time and a token is set, the `authentication` module will attempt to auto-login with that token. If the token is no longer valid, it will be deleted.

When a new token is obtained or after the successfull auto-login, it's added to common headers in `requests` module.

For a more detailed description, see README.md file in `libs/authentication` folder.


# Internal Depencency Tree

Libs talks to each other, as well as with store, generating the following tree.

```
       exceptions ----|
           |          |
store      |       requests
 |-- authentication --|
```

# Config

Few configuration variables can be customized. They can be defined inside `config` folder in two files:
- `serverConfig.dev.json`;
- `serverConfig.prod.json`;

The two files are **not saved** in the repository.

The content will be loaded accordingly.
Keys of the JSON file will be used to create configuration constants in `config.js` file.

| Key | Default | Description |
| --- | --- | --- |
| BACKEND_URL | `http://localhost/` | Base URL used by `requests` module. |

For example, to override `BACKEND_URL` in Dev mode, you can use the following `serverConfig.dev.json`:

```json
{
    "BACKEND_URL": "http://localhost:8091/"
}
```

# Credits

Main developer: Vittorio Zamboni.