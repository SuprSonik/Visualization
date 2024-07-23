import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import './Graph6SamplingMethod.css';

const csvData = `SamplingMethod,Average Aerror
ADV,0.14277143997749997
COV,0.04521557393374998
IID,0.06529978194874997
OOD,0.21745575802624997
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

const Graph6SamplingMethod = () => {
    const [chartInstance, setChartInstance] = useState(null);
    const [sortedData, setSortedData] = useState(null);

    const handleSort = () => {
        const parsedData = parseCSV(csvData);
        const sorted = parsedData.sort((a, b) => parseFloat(a['Average Aerror']) - parseFloat(b['Average Aerror']));
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
        const categories = parsedData.map(row => row.SamplingMethod);
        const data = parsedData.map(row => parseFloat(row['Average Aerror']));

        const option = {
            title: {
                text: 'Bar Chart of Average Aerror by SamplingMethod'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    var point = params[0];
                    var info = `SamplingMethod: ${categories[point.dataIndex]}<br>Average Aerror: ${point.value.toFixed(4)}`;
                    return info;
                }
            },
            xAxis: {
                type: 'category',
                data: categories
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data,
                    type: 'bar'
                }
            ]
        };

        chartInstance.setOption(option);

        chartInstance.on('click', function (params) {
            var point = params.dataIndex;
            var info = `SamplingMethod: ${categories[point]}<br>Average Aerror: ${data[point].toFixed(4)}`;

            var infoBox = document.getElementById('info');
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

export default Graph6SamplingMethod;
