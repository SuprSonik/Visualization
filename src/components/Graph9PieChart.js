import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import './Graph9PieChart.css';

const csvData = `Variable,Weight
BarChartType,0.0231
ModelName,0.0178
SamplingTarget,0.0062
SamplingMethod,0.1723
DownsamplingLevel,0.1687
RunIndex,0.0208
`;

const parseCSV = (data) => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => {
        const values = line.split(',');
        const result = {};
        headers.forEach((header, index) => {
            result[header] = values[index];
        });
        return result;
    });
    return rows;
};

const Graph9PieChart = () => {
    const [chartInstance, setChartInstance] = useState(null);
    const [sortedData, setSortedData] = useState(null);

    const handleSort = () => {
        const parsedData = parseCSV(csvData);
        const sorted = parsedData.sort((a, b) => parseFloat(a.Weight) - parseFloat(b.Weight));
        setSortedData(sorted);
    };

    useEffect(() => {
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        setChartInstance(myChart);

        return () => {
            myChart.dispose();
        };
    }, []);

    useEffect(() => {
        if (!chartInstance) return;

        const parsedData = sortedData || parseCSV(csvData);
        const pieData = parsedData.map(row => ({
            name: row.Variable,
            value: parseFloat(row.Weight)
        }));

        const option = {
            title: {
                text: 'Weight Distribution of Variables',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.name}: ${params.value.toFixed(4)}`;
                }
            },
            series: [
                {
                    name: 'Weights',
                    type: 'pie',
                    radius: '50%',
                    data: pieData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        chartInstance.setOption(option);

        chartInstance.on('click', function (params) {
            const info = `${params.name}: ${params.value.toFixed(4)}`;

            const infoBox = document.getElementById('info');
            infoBox.innerHTML = info;
            infoBox.style.display = 'block';
        });

        window.addEventListener('resize', () => {
            chartInstance.resize();
        });

        return () => {
            window.removeEventListener('resize', () => {
                chartInstance.resize();
            });
        };
    }, [chartInstance, sortedData]);

    return (
        <div>
            <button onClick={handleSort}>Sort Data</button>
            <div id="main" style={{ width: '100%', height: '500px' }}></div>
            <div id="info" className="info-box"></div>
        </div>
    );
};

export default Graph9PieChart;
