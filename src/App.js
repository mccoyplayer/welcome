import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Apple from "./pages/Apple/Apple";
import Windows from "./pages/Windows/Windows";
import DVD from "./pages/DVD/DVD";
import NotFoundPage from "./pages/404Page/404Page";
import Layout from "./pages/Layout/Layout";
import { inject } from '@vercel/analytics';

function App() {
    useEffect(() => {
        // Inject Vercel Analytics
        inject();
    }, []);

    useEffect(() => {
        // Function to set dark mode based on system preference
        const setDarkMode = (prefersDarkMode) => {
            document.documentElement.classList.toggle('dark', prefersDarkMode);
        };

        // Check if dark mode is initially preferred
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);

        // Watch for changes in dark mode preference
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleDarkModeChange = (e) => {
            setDarkMode(e.matches);
        };
        darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

        // Cleanup
        return () => {
            darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout isNotFound={false}><Home/></Layout>}/>
                <Route path="/apple" element={<Layout isNotFound={false}><Apple/></Layout>}/>
                <Route path="/windows" element={<Layout isNotFound={false}><Windows/></Layout>}/>
                <Route path="/dvd" element={<Layout isNotFound={false}><DVD/></Layout>}/>
                {/* 404 Not Found route */}
                <Route path="*" element={<Layout isNotFound={true}><NotFoundPage/></Layout>}/>
            </Routes>
        </Router>
    );
}

export default App;
