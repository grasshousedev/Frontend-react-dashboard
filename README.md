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

# Configuration

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

# Credits

Main developer: Vittorio Zamboni.