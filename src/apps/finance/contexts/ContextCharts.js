import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


export function ContextCategoriesChart({ context, moneyMovements, categories, chartStyle }) {
    const data = [];
    const groups = {};
    
    moneyMovements.forEach(mm => {
        const group = categories[mm.category].parent || mm.category;
        if (!groups[group]) groups[group] = 0;
        groups[group] += parseFloat(mm.amount);        
    });

    let labels = Object.keys(groups);
    labels.forEach(group => data.push(groups[group]));
    labels = labels.map(cId => categories[cId].name);

    const chartData = {
        labels,
        datasets: [{
            label: context.name,
            data,
            borderColor: context.attributes_ui.color ? context.attributes_ui.color : undefined,
            borderWidth: 1,
        }]
    };
    return <div style={chartStyle}>
        <Bar
            data={chartData}
            height={250}
            options={{
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 0
                        }
                    }]
                },
                legend: { display: false },
            }}
        />
    </div>;
}

ContextCategoriesChart.propTypes = {
    context: PropTypes.object.isRequired,
    moneyMovements: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    chartStyle: PropTypes.object,
};
