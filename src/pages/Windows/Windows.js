import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Windows.css';
import {windows} from "../Content";

function Windows() {
    const loaderRef = useRef(null);

    const startAnimation = useCallback((startWidth) => {
        if (loaderRef.current) {
            loaderRef.current.style.transition = 'none';
            loaderRef.current.style.width = `${startWidth}%`;
            setTimeout(() => {
                loaderRef.current.style.transition = 'width 10s linear';
                loaderRef.current.style.width = '100%';
            }, 100);
        }
    }, []);

    const restartAnimation = useCallback(() => {
        const randomStartWidth = Math.random() * 100;
        startAnimation(randomStartWidth);
    }, [startAnimation]);

    useEffect(() => {
        startAnimation(0);
        const interval = setInterval(restartAnimation, 11000);
        return () => clearInterval(interval);
    }, [restartAnimation]);

    const [textIndex, setTextIndex] = useState(0);
    const [loadPercent, setLoadPercent] = useState(0);

    const changeText = useCallback(() => {
        // Update textIndex to next index
        setTextIndex((prevIndex) => (prevIndex + 1) % windows.text.length);
    }, []);

    useEffect(() => {
        // If text changes, reset the load percent and set up a new interval
        const currentDuration = windows.text[textIndex].seconds * 1000;
        setLoadPercent(0);

        const percentInterval = setInterval(() => {
            setLoadPercent((prevPercent) => {
                const newPercent = prevPercent + (100 / (currentDuration / 1000));
                if (newPercent >= 100) {
                    clearInterval(percentInterval);
                }
                return newPercent;
            });
        }, 1000);

        // Schedule text change at the end of the current duration
        const textChangeTimeout = setTimeout(changeText, currentDuration);

        return () => {
            clearInterval(percentInterval);
            clearTimeout(textChangeTimeout);
        };
    }, [textIndex, changeText]);

    return (
        <div className="windows-container">
            <div className="windows-logo">
                <div className='windows-loader'>
                    <div className='windows-loader-circle'></div>
                    <div className='windows-loader-circle'></div>
                    <div className='windows-loader-circle'></div>
                    <div className='windows-loader-circle'></div>
                    <div className='windows-loader-circle'></div>
                </div>
            </div>
            <div className="windows-loader-text-one">
                <p>{windows.text[textIndex].text}</p>
            </div>
            <div className="windows-loader-text-two">
                <p>{Math.min(loadPercent.toFixed(0), 100)}% Complete</p>
            </div>
            <div className="windows-loader-text-three">
                <p>Don't turn off your computer</p>
            </div>
            <div className="windows-loader-text-four">
                <p>Your PC will restart several times</p>
            </div>
        </div>
    );
}

export default Windows;
