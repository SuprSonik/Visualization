import React from "react";
import { useState } from 'react';
import Conclusion1 from './Conclusion1.js';
import Conclusion2 from './Conclusion2.js';
import Conclusion3 from './Conclusion3.js';
export default function Conclusion() {
    const [index, setIndex] = useState(1);
    function handleClick1() {
        setIndex(1);
    }
    function handleClick2() {
        setIndex(2);
    }
    function handleClick3() {
        setIndex(3);
    }
    if (index === 1)
        return (
            <>
                <div className="conclusionButtonBox">
                    <button onClick={handleClick1} className='conclusionButton'>Conclusion 1</button>
                    <button onClick={handleClick2} className='conclusionButton'>Conclusion 2</button>
                    <button onClick={handleClick3} className='conclusionButton'>Conclusion 3</button>
                </div>
                <Conclusion1 />
            </>
        )
    else if (index === 2)
        return (
            <>
                <div className="conclusionButtonBox">
                    <button onClick={handleClick1} className='conclusionButton'>Conclusion 1</button>
                    <button onClick={handleClick2} className='conclusionButton'>Conclusion 2</button>
                    <button onClick={handleClick3} className='conclusionButton'>Conclusion 3</button>
                </div>
                <Conclusion2 />
            </>
        )
    else return (
        <>
            <div className="conclusionButtonBox">
                <button onClick={handleClick1} className='conclusionButton'>Conclusion 1</button>
                <button onClick={handleClick2} className='conclusionButton'>Conclusion 2</button>
                <button onClick={handleClick3} className='conclusionButton'>Conclusion 3</button>
            </div>
            <Conclusion3 />
        </>
    )
}