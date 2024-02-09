import React, {useEffect, useState} from 'react';
import './Home.css';
import {FaApple, FaGithub, FaInstagram, FaLinkedin, FaWindows} from 'react-icons/fa';
import {FaPersonWalkingArrowLoopLeft} from "react-icons/fa6";
import {NavLink} from "react-router-dom";

function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="flex flex-col justify-center items-center bg-black text-white text-center min-h-screen w-full relative">
            <div className="flex flex-col items-center justify-center mt-0 mb-5">
                <h1 className="text-[calc(3vh+3vw)] font-bold">Welcome</h1>
                <h1 className="text-[calc(3vh+3vw)] font-bold flex items-center justify-center gap-x-1">
                    To The <FaPersonWalkingArrowLoopLeft/> Project
                </h1>
            </div>
            <p className="text-[calc(1.2vh+1.2vw)] leading-relaxed max-w-[85vw] my-4">
                Dive into an array of endless loading screens. Sit back, relax, and enjoy the hypnotic visuals.
                {!isMobile && (
                    <> {/* React Fragment */}
                        Toggle fullscreen mode with the <strong>F</strong> key and exit with <strong>Esc</strong>.
                    </>
                )}
            </p>
            <p className="text-[calc(1.2vh+1.2vw)] leading-relaxed max-w-[85vw] my-4">
                <strong>Note:</strong> Fullscreen mode is optimized for the loading screens and may not function on this
                page.
            </p>
            <p className="text-[calc(1.2vh+1.2vw)] leading-6 max-w-[90vw] mb-2.5">
                This creative side project was crafted by <a href="https://www.linkedin.com/in/shubhthorat/"
                                                             target="_blank" rel="noopener noreferrer"
                                                             className="text-current no-underline transition duration-500 ease-in-out hover:underline hover:text-gray-400"><strong>Shubh
                Thorat</strong></a> for fun. Enjoy the experience!
            </p>

            {isMobile && (
                <div className="flex justify-center gap-x-5 mt-5">
                    <NavLink to="/apple" className="mobile-icon-link">
                        <FaApple className="text-3xl"/>
                    </NavLink>
                    <NavLink to="/windows" className="mobile-icon-link">
                        <FaWindows className="text-3xl"/>
                    </NavLink>
                </div>
            )}
            <p className="mt-8 mb-2.5 font-bold">
                {isMobile ? 'Connect with me here:' : ''}
            </p>

            <div className="flex justify-center gap-x-20 mt-8">
                <a href="https://github.com/itsjustshubh" target="_blank" rel="noopener noreferrer" title="GitHub"
                   className="text-current transition-colors duration-300 hover:text-gray-800">
                    <FaGithub className="text-7xl"/>
                </a>
                <a href="https://www.linkedin.com/in/shubhthorat/" target="_blank" rel="noopener noreferrer"
                   title="LinkedIn" className="text-current transition-colors duration-300 hover:text-[#0077b5]">
                    <FaLinkedin className="text-7xl"/>
                </a>
                <a href="https://instagram.com/_itsjustshubh" target="_blank" rel="noopener noreferrer"
                   title="Instagram" className="text-current transition-colors duration-300 hover:text-pink-600">
                    <FaInstagram className="text-7xl"/>
                </a>
            </div>
        </div>
    );
}

export default Home;
