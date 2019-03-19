import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { finance } = state;

    return {
        finance
    };
}

export const withFinance = connect(mapStateToProps);
