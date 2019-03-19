import React from 'react';
import PropTypes from 'prop-types';

import { InlineLoader } from 'components/ui/Loader';
import { withDashboard } from 'store/storeConnection';

function Footer({ dashboard }) {
    return <div className="ui-footer__container">
        <div>Copyright Vittorio Zamboni 2019</div>
        <div>
            {dashboard.loading && <InlineLoader />}
        </div>
    </div>;
}

Footer.propTypes = {
    dashboard: PropTypes.object,
};

const connectedFooter = withDashboard(Footer);
export { connectedFooter as Footer };
