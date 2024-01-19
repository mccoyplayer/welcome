// App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home'; // Adjust the path if your folder structure is different
import Apple from "./pages/Apple/Apple";
import Windows from "./pages/Windows/Windows";
import Layout from "./pages/Layout/Layout";
import DVD from "./pages/DVD/DVD";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Main page routers */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/apple" element={<Apple/>}/>
                    <Route path="/windows" element={<Windows/>}/>
                    <Route path="/dvd" element={DVD}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
