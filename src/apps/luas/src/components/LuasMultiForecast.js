import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../../../components/ui/Icon';

import { DEFAULT_MULTI_FORECAST_TIMEOUT } from '../constants';
import { LuasForecast } from './LuasForecast';


export function LuasMultiForecast({ stations, multi_forecast_timeout=DEFAULT_MULTI_FORECAST_TIMEOUT }) {
    const [stationIndex, setStationIndex] = useState(0);

    const nextIndex = index => index < stations.length - 1 ? index + 1 : 0;
    const previousIndex = index => index === 0 ? stations.length - 1 : index - 1;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStationIndex(nextIndex(stationIndex));
        }, multi_forecast_timeout);
        return () => clearTimeout(timeout);
    }, [stationIndex, setStationIndex]); // eslint-disable-line

    const getTitle = (label, lastUpdate) => {
        return <div className="luas__multi-forecast__container">
            <span className="luas__multi-forecast__control">
                <Icon name="keyboard_arrow_left"
                    onClick={() => setStationIndex(previousIndex(stationIndex))} />
            </span>
            <h2 className="luas__forecast__title">
                {label}
                <span className="luas__forecast__last-update">{lastUpdate}</span>
            </h2>
            <span className="luas__multi-forecast__control">
                <Icon name="keyboard_arrow_right"
                    onClick={() => setStationIndex(nextIndex(stationIndex))} />
            </span>
        </div>;
    };

    return <Fragment>
        {stations.map((station, index) => {
            return <div key={index}
                style={{ display: index === stationIndex ? 'block' : 'none' }}
            >
                <LuasForecast station={station} getTitle={getTitle} />
            </div>;
        })}
    </Fragment>;
}

LuasMultiForecast.propTypes = {
    stations: PropTypes.array.isRequired,
    multi_forecast_timeout: PropTypes.number,
};