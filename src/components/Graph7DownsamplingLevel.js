import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import './Graph7DownsamplingLevel.css';

const csvData = `DownsamplingLevel,Average Aerror
2,0.03881104479999998
4,0.08726800703124997
8,0.13715970334625
16,0.20750379870874996
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

const Graph7DownsamplingLevel = () => {
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
        const categories = parsedData.map(row => row.DownsamplingLevel);
        const data = parsedData.map(row => parseFloat(row['Average Aerror']));

        const option = {
            title: {
                text: 'Bar Chart of Average Aerror by DownsamplingLevel'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    var point = params[0];
                    var info = `DownsamplingLevel: ${categories[point.dataIndex]}<br>Average Aerror: ${point.value.toFixed(4)}`;
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
            var info = `DownsamplingLevel: ${categories[point]}<br>Average Aerror: ${data[point].toFixed(4)}`;

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

export default Graph7DownsamplingLevel;
