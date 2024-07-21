import React from 'react';
export default function Head() {
    const aStyle = {
        textDecoration: 'none',
        color: 'black'
    };
    return (
        <>
            <div style={{ width: '100%', display: 'block', backgroundColor: 'black', height: 5 }}></div>
            <span className='headContent'>Data&nbsp;Visualization</span>
            <ul className='anchorBox'>
                <li class='anchor'><a href='#rearId' style={aStyle}>Rear&nbsp;&nbsp;&nbsp;</a></li>
                <li class='anchor'><a href='#dataVisualizationId' style={aStyle}>DataVisualization&nbsp;&nbsp;</a></li>
                <li class='anchor'><a href='#introduceId' style={aStyle}>Introduction&nbsp;&nbsp;</a></li>
                <div style={{ display: 'block' }}></div>
            </ul>
        </>
    )
}