import React, { Fragment } from 'react';

export function Colors() {
    const shades = ['', 'light'];
    const full = ['d2', 'd1', '', 'l1', 'l2'];
    const partial = ['d1', '', 'l1'];    
    const colors = [
        { name: 'primary', type: full },
        { name: 'neutral', type: full },
        { name: 'blue', type: full },
        { name: 'grey', type: full },
        { name: 'pink', type: partial },
        { name: 'red', type: partial },
        { name: 'yellow', type: partial },
        { name: 'teal', type: full },
    ];
    return <Fragment>
        <h2>Colors</h2>
        {colors.map(color => {
            return <Fragment key={color.name}>
                {shades.map(shade => {
                    const colorName = shade !== '' ? `${color.name}-${shade}` : color.name;
                    return <div key={colorName}>
                        <h3>{colorName}</h3>   
                        <div key={colorName} className="flex-container">
                            {color.type.map(gradient => {
                                const gradientPart = gradient !== '' ? `-${gradient}` : '';
                                const colorClass = `${colorName}${gradientPart}`;
                                const colorStyle = { display: 'inline-block', width: '50px', height: '30px', marginRight: '15px', border: '1px solid #343434' };
                                return <div
                                    key={colorClass}
                                    className="w-200 flex-container--middle"
                                    style={{ paddingRight: '20px' }}
                                    onClick={() => document.body.className = `background-${colorClass}`}
                                >
                                    <div
                                        className={`background-${colorClass}`}
                                        style={colorStyle}
                                    />
                                    {colorClass}
                                </div>;
                            })}
                        </div>
                    </div>;
                })}
            </Fragment>;
        })}
    </Fragment>;
};
