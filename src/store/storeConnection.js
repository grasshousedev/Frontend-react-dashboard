import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { dashboard } = state;

    return {
        dashboard
    };
}

export const withDashboard = connect(mapStateToProps);
