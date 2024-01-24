import React from 'react';
import './404Page.css';

const NotFoundPage = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <div className="notfound-header">
                    <h1>404</h1>
                    <h2>Oops! Page not found.</h2>
                </div>
                <p>Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.</p>
                <a href="/" className="home-link">Return Home</a>
            </div>
        </div>
    );
}

export default NotFoundPage;
