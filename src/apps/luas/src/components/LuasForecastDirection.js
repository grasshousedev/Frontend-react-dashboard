import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { DIRECTIONS } from '../constants';


export function LuasForecastDirection({ trams, title }) {
    const firstTram = trams && trams[0];
    const firstTramClass = firstTram && firstTram.due >= 5 ? 'color-positive' : 'color-negative';

    return <div className="luas__forecast-direction__container">
        <div className="luas__forecast-direction__title__container">
            <span className="luas__forecast-direction__title">
                {title === DIRECTIONS.inbound ? 'IN' : 'OUT'}
            </span>
        </div>
        <div className="luas__forecast-direction__trams__container">
            {firstTram &&
                <Fragment>
                    <div className='luas__forecast-direction__first-tram'>
                        <span className={`luas__forecast-direction__first-tram__due ${firstTramClass}`}>{firstTram.due}</span>
                        <span className='luas__forecast-direction__first-tram__destination'>{firstTram.destination}</span>
                    </div>
                    <div className='luas__forecast-direction__trams'>
                        {trams.slice(1).map((tram, index) => {
                            return <div className="luas__forecast-direction__tram" key={index}>
                                <span className="luas__forecast-direction__tram__due">{tram.due}</span>
                                <span className="luas__forecast-direction__tram__destination">{tram.destination}</span>
                            </div>;
                        })}
                    </div>

                </Fragment>
            }
            {!trams && <span>No trams</span>}
        </div>
    </div>;
}

LuasForecastDirection.propTypes = {
    trams: PropTypes.array,
    title: PropTypes.string,
};