import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Apple.css';
import {apple} from "../Content";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faApple} from '@fortawesome/free-brands-svg-icons';

function Apple() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
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

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % apple.text.length);
        }, ((Math.random() * 5) + 0.5) * 1000);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <div class="bg-white dark:bg-black flex flex-col items-center justify-center h-screen w-screen text-white overflow-hidden relative">
            {isMobile ? (
                <>
                    <div
                        class="text-black dark:text-white absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12vh]">
                        <FontAwesomeIcon icon={faApple}/>
                    </div>
                    <div
                        class="bg-gray-300 dark:bg-gray-800 absolute bottom-[45%] left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[60%] h-[0.9vh] rounded-[2vh] overflow-hidden">
                        <div class="bg-black dark:bg-white h-full w-0 transition-all duration-1000 ease-linear"
                             ref={loaderRef}></div>
                    </div>
                    <div
                        class="text-black dark:text-white absolute bottom-[42.5%] left-1/2 transform translate-x-[-50vw] translate-y-[1vh] w-full text-center text-[1.4vh] font-bold">
                        <p>{apple.text[textIndex]}</p>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="text-black dark:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[13vh]">
                        <FontAwesomeIcon icon={faApple}/>
                    </div>
                    <div
                        className="bg-gray-300 dark:bg-gray-800 absolute bottom-[40%] left-1/2 transform translate-x-[-10vw] translate-y-[15vh] w-[20%] h-[0.9vh] rounded-[2vh] overflow-hidden">
                        <div className="bg-black dark:bg-white h-full w-0 transition-all duration-1000 ease-linear" ref={loaderRef}></div>
                    </div>
                    <div className="text-black dark:text-white absolute bottom-[23%] left-1/2 transform translate-x-[-50vw] translate-y-[1vh] w-full text-center text-[1.4vh] font-bold">
                        <p>{apple.text[textIndex]}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Apple;
