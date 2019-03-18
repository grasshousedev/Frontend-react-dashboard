import React, { Fragment } from 'react';

export function Colors() {
    const shades = ['', 'light'];
    const modifiers = ['d2', 'd1', '', 'l1', 'l2'];
    const colors = [
        { name: 'primary' },
        { name: 'neutral' },
        { name: 'blue' },
        { name: 'grey' },
        { name: 'purple' },
        { name: 'pink' },
        { name: 'red' },
        { name: 'yellow' },
        { name: 'teal' },
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
                            {modifiers.map(gradient => {
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
