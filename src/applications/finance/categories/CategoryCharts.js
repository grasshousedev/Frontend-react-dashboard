import React from 'react';
import PropTypes from 'prop-types';
import { Line, Bar } from 'react-chartjs-2';

export function CategoryLineChart({ category, moneyMovements, chartStyle }) {
    const labels = [];
    const data = [];

    const averageFlowSign = category.average_flow === 'income' ? '+' : '-';
    moneyMovements.forEach(mm => {
        labels.push(mm.movement_date);        
        data.push(parseFloat(mm.amount) * (averageFlowSign === mm.movement ? 1 : -1));
    });

    const chartData = {
        labels,
        datasets: [{
            label: category.name,
            data,
            lineTension: 0.1,
            borderColor: category.attributes_ui.color ? category.attributes_ui.color : undefined,
        }]
    };
    return <div style={chartStyle}>
        <Line
            data={chartData}
            height={300}
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

CategoryLineChart.propTypes = {
    category: PropTypes.object,
    moneyMovements: PropTypes.array,
    chartStyle: PropTypes.object,
};

export function CategoryMonthlyChart({ category, moneyMovements, chartStyle }) {
    const data = [];
    const groups = {};
    
    moneyMovements.forEach(mm => {
        const group = mm.movement_date.substr(0, 7);
        if (!groups[group]) groups[group] = 0;
        groups[group] += parseFloat(mm.amount);        
    });

    const labels = Object.keys(groups);
    labels.sort();
    labels.forEach(group => data.push(groups[group]));

    const chartData = {
        labels,
        datasets: [{
            label: category.name,
            data,
            borderColor: category.attributes_ui.color ? category.attributes_ui.color : undefined,
            borderWidth: 1,
        }]
    };
    return <div style={chartStyle}>
        <Bar
            data={chartData}
            height={150}
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

CategoryMonthlyChart.propTypes = {
    category: PropTypes.object,
    moneyMovements: PropTypes.array,
    chartStyle: PropTypes.object,
};
