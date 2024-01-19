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
        <div className="home-container">
            <h1 style={{marginBottom: "0"}}>Welcome</h1>
            <h1>To The <FaPersonWalkingArrowLoopLeft/> Project</h1>
            <p>
                Dive into an array of endless loading screens. Sit back, relax, and enjoy the hypnotic visuals.
                {isMobile ? '' :
                'Toggle fullscreen mode with the <strong>F</strong> key and exit with <strong>Esc</strong>.' }
            </p>
            <p>
                <strong>Note:</strong> Fullscreen mode is optimized for the loading screens and may not function on this
                page.
            </p>
            <p>
                This creative side project was crafted by <a href="https://www.linkedin.com/in/shubhthorat/"
                                                             target="_blank"
                                                             rel="noopener noreferrer"><strong>Shubh
                Thorat</strong></a> for fun. Enjoy the experience!
            </p>

            {isMobile && (
                <div className="platform-icons">
                    <NavLink to="/apple" className="mobile-icon-link">
                        <FaApple className="mobile-icon apple-icon"/>
                    </NavLink>
                    <NavLink to="/windows" className="mobile-icon-link">
                        <FaWindows className="mobile-icon windows-icon"/>
                    </NavLink>
                </div>
            )}
            <p style={{marginTop: "3vh", marginBottom: "1vh", fontWeight: "Bold"}}>
                {isMobile ? 'Connect with me here:' : ''}
            </p>

            <div style={{marginTop: "1vh"}} className="social-links">
                <a href="https://github.com/itsjustshubh" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <FaGithub className="icon"/>
                </a>
                <a href="https://www.linkedin.com/in/shubhthorat/" target="_blank" rel="noopener noreferrer"
                   title="LinkedIn">
                    <FaLinkedin className="icon"/>
                </a>
                <a href="https://instagram.com/_itsjustshubh" target="_blank" rel="noopener noreferrer"
                   title="Instagram">
                    <FaInstagram className="icon"/>
                </a>
            </div>
        </div>
    );
}

export default Home;
