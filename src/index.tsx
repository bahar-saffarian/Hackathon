import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Blog from "./blog/Blog";
import {CircularProgress} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const Profile = lazy(() => import("./blog/Profile"));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={<CircularProgress/>}>
                        <Blog/>
                    </Suspense>
                }/>
                <Route path="/profile" element={
                    <Suspense fallback={<CircularProgress/>}>
                        <Profile/>
                    </Suspense>
                }/>
            </Routes>
        </Router>
    </React.StrictMode>
);
