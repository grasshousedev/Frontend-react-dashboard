import PropTypes from 'prop-types';

export const propTypeChildren = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]);
