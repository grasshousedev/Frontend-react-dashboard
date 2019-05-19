import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CodeHighlight } from 'components/style/CodeHighlight';

import { withFinance } from '../storeConnection';
import { FINANCE_BASE_URL } from '../constants';

function MoneyMovementDetail({ moneyMovement, finance }) {
    const category = finance.categories[moneyMovement.category];
    const context = moneyMovement.context && finance.contexts[moneyMovement.context];

    const categoryStyle = category.attributes_ui.color
        ? { border: `2px solid ${category.attributes_ui.color}`, borderRadius: 0 } : {};
    const contextStyle = context && context.attributes_ui.color
        ? { border: `2px solid ${context.attributes_ui.color}`, borderRadius: 0 } : {};

    return <div>
        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="ui-form__field">
                    <label className="ui-form__label w-100">Amount</label>
                    <div className="ui-form__field-input">{moneyMovement.movement}{moneyMovement.amount}</div>                        
                </div>
            </div>
            <div className="col-xs-12 col-sm-6">
                <div className="ui-form__field">
                    <label className="ui-form__label w-100">Date</label>
                    <div className="ui-form__field-input">{moneyMovement.movement_date}</div>                        
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <div className="ui-form__field">
                    <label className="ui-form__label w-100">Category</label>
                    <div className="ui-form__field-input">
                        <Link to={`${FINANCE_BASE_URL}/categories/${category.id}`}>
                            <label className="ui-tag" style={categoryStyle}>{category.name}</label>
                        </Link>
                    </div>                        
                </div>
            </div>
            <div className="col-xs-12 col-sm-6">
                <div className="ui-form__field">
                    <label className="ui-form__label w-100">Context</label>
                    <div className="ui-form__field-input">
                        {context && <label className="ui-tag" style={contextStyle}>{context.name}</label>}
                    </div>                        
                </div>
            </div>
        </div>
        {moneyMovement.movement === '-' && 
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-form__field" style={{ alignItems: 'flex-start' }}>
                        <label className="ui-form__label w-100">Users</label>
                        <div className="ui-form__field-input">
                            {moneyMovement.users_relation.map(ur => {
                                return <div key={ur.id}>{ur.percentage}% paid by {finance.users[ur.user].first_name}</div>;
                            })}
                        </div>                        
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-form__field" style={{ alignItems: 'flex-start' }}>
                        <label className="ui-form__label w-100">Tags</label>
                        <div className="ui-form__field-input" style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
                            {moneyMovement.tags.map(tag => {
                                return <label className="ui-tag ui-tag--primary" key={tag}>{tag}</label>;
                            })}
                        </div>                        
                    </div>
                </div>
            </div>
        }
        {moneyMovement.description &&
            <div className="row">
                <div className="col-xs-12">
                    <div className="ui-form__field">
                        <label className="ui-form__label w-100">Description</label>
                        <div className="ui-form__field-input">{moneyMovement.description}</div>                        
                    </div>
                </div>
            </div>
        }
        <CodeHighlight>{JSON.stringify(moneyMovement, null, 4)}</CodeHighlight>
    </div>;
}

MoneyMovementDetail.propTypes = {
    moneyMovement: PropTypes.object.isRequired,
    finance: PropTypes.object.isRequired,
};

const connectedMoneyMovementDetail = withFinance(MoneyMovementDetail);
export { connectedMoneyMovementDetail as MoneyMovementDetail };

