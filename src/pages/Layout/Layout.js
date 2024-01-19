import React, {useEffect, useState} from 'react';
import AnimatedCursor from 'react-animated-cursor';
import {NavLink, useLocation} from 'react-router-dom';
import './Layout.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faApple, faWindows} from '@fortawesome/free-brands-svg-icons';
import {faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

function Layout({children}) {
    const location = useLocation();

    useEffect(() => {
        // Function to update the background color based on the route
        const updateBackgroundColor = () => {
            let colorClass = '';
            switch (location.pathname) {
                case '/':
                    colorClass = 'home-container';
                    break;
                case '/apple':
                    colorClass = 'apple-container';
                    break;
                // Add cases for other paths and their corresponding color classes
                case '/windows':
                    colorClass = 'windows-container';
                    break;
                case '/dvd':
                    colorClass = 'apple-container';
                    break;
                default:
                    colorClass = 'bg-color';
            }
            document.body.className = colorClass;
        };

        updateBackgroundColor();

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove('bg-color-1', 'bg-color-2'); // Add all classes used
        };
    }, [location.pathname]);

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    // Check if the current route is the Home screen
    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if the current route is the Home page
            if (location.pathname === '/') {
                return; // Do nothing if on Home page
            }

            if (event.key === 'f' || event.key === 'F') {
                toggleFullScreen();
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [location.pathname]);

    const [showFullScreenLink, setShowFullScreenLink] = useState(location.pathname !== '/');
    const [linkTransition, setLinkTransition] = useState('');
    const [currentLocation, setCurrentLocation] = useState(location.pathname);

    useEffect(() => {
        const nextLocation = location.pathname;
        const isCurrentHome = currentLocation === '/';
        const isNextHome = nextLocation === '/';

        // Transition only if moving to or from the Home page
        if (isCurrentHome !== isNextHome) {
            if (isNextHome) {
                // Transition for disappearing the Full Screen link when moving to Home
                setLinkTransition('exiting');
                setTimeout(() => setShowFullScreenLink(false), 300);
            } else {
                // Transition for appearing the Full Screen link when moving away from Home
                setShowFullScreenLink(true);
                setLinkTransition('entering');
                setTimeout(() => setLinkTransition(''), 300);
            }
        } else {
            // No transition needed if both current and next locations are not Home
            setShowFullScreenLink(!isNextHome);
            setLinkTransition('');
        }

        // Update current location for next render
        setCurrentLocation(nextLocation);
    }, [location.pathname]);

    const [cursorColor, setCursorColor] = useState('123, 12, 23');
    useEffect(() => {
        switch (location.pathname) {
            case '/apple':
                setCursorColor('255, 255, 255'); // White for DVD
                break;
            case '/windows':
                setCursorColor('255, 255, 255'); // Blue for Windows
                break;
            case '/dvd':
                setCursorColor('255, 255, 255'); // White for DVD Logo
                break;
            default:
                setCursorColor('123, 12, 23'); // Default color for other pages
        }
    }, [location.pathname]);

    const cursorConfig = {
        innerSize: 0.007 * window.innerHeight + 0.007 * window.innerWidth,
        outerSize: 0.02 * window.innerHeight + 0.02 * window.innerWidth,
        color: cursorColor, // Use the state variable for color
        outerAlpha: 0.4,
        innerScale: 0.5,
        outerScale: 2,
        display: isFullScreen ? 'none' : 'block',
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="layout-background">
            <div className="navbar" style={{display: (isMobile || isFullScreen) ? 'none' : 'flex'}}>
                <ul>
                    <li><NavLink to="/"
                                 className={isActive('/') ? 'nav-link nav-link-active' : 'nav-link'}>Home</NavLink></li>

                    {/* DVD NavLink */}
                    <li>
                        <NavLink to="/apple"
                                 className={isActive('/apple') ? 'nav-link nav-link-active apple-link' : 'nav-link apple-link'}>
                            <FontAwesomeIcon icon={faApple} className="nav-icon"/>
                            Apple
                        </NavLink>
                    </li>

                    {/* Windows NavLink */}
                    <li>
                        <NavLink to="/windows"
                                 className={isActive('/windows') ? 'nav-link nav-link-active windows-link' : 'nav-link windows-link'}>
                            <FontAwesomeIcon icon={faWindows} className="nav-icon"/>
                            Windows
                        </NavLink>
                    </li>

                    {/* DVD Logo NavLink */}
                    {/*<li>*/}
                    {/*  <NavLink to="/dvd" className={isActive('/dvd') ? 'nav-link nav-link-active dvd-link' : 'nav-link dvd-link'}>*/}
                    {/*    <img src={dvdLogo} alt="DVD Logo" className="nav-icon"/> /!* Add this line *!/*/}
                    {/*    DVD Logo*/}
                    {/*  </NavLink>*/}
                    {/*</li>*/}

                    {/* Full Screen NavLink */}
                    {showFullScreenLink && (
                        <li className={linkTransition}>
                            <NavLink onClick={toggleFullScreen} className='nav-link fullscreen-link'>
                                <FontAwesomeIcon icon={faExpandArrowsAlt} className="nav-icon"/>
                                Full Screen
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>

            {!isMobile && !isFullScreen && <AnimatedCursor {...cursorConfig} />}

            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <div className="page">
                        {children}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default Layout;
