import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FullSectionLoader } from '../../../../components/ui/Loader';

import { DIRECTIONS } from '../constants';
import { getLuasData } from '../forecast';
import { getTramsByDirection } from '../trams';
import { LuasForecastDirection } from './LuasForecastDirection';


export function LuasForecast({ station, getTitle }) {
    const [state, setState] = useState();

    useEffect(() => {
        getLuasData(station, setState);
        const interval = setInterval(() => getLuasData(station, setState), 1000 * 10);
        return () => { clearInterval(interval); };
    }, [station, setState]);

    if (!state) {
        return <FullSectionLoader />;
    }

    const message = state[station.code].luas.stopInfo.message._text;
    const inbound = getTramsByDirection(state[station.code].luas.stopInfo, DIRECTIONS.inbound);
    const outbound = getTramsByDirection(state[station.code].luas.stopInfo, DIRECTIONS.outbound);

    return <div className="luas__forecast__container">
            {getTitle && getTitle(station.label, state[station.code].lastUpdate)}
            {!getTitle && <h2 className="luas__forecast__title luas__forecast__title--margin">
                {station.label}
                <span className="luas__forecast__last-update">{state[station.code].lastUpdate}</span>
            </h2>}
            <div className="luas__forecast__directions__container">
                <LuasForecastDirection trams={inbound} title={DIRECTIONS.inbound} />
                <LuasForecastDirection trams={outbound} title={DIRECTIONS.outbound} />
            </div>
            <div className="luas__forecast__message">{message}</div>
    </div>;

}

LuasForecast.propTypes = {
    station: PropTypes.shape({
        code: PropTypes.string.isRequired,
        label: PropTypes.string,
    }).isRequired,
    getTitle: PropTypes.func,
};
