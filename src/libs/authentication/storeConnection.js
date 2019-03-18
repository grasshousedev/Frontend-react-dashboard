import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { authentication } = state;

    return {
        authentication
    };
}

export const withAuthentication = connect(mapStateToProps);
