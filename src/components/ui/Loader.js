import React from 'react';

export function FullSectionLoader() {
    return <div className="ui-loader__page__container">
        <div className="ui-loader ui-loader--large" />
    </div>;
}

export function InlineLoader() {
    return <div className="ui-loader__inline__container">
        <div className="ui-loader__inline" />
    </div>;
}
