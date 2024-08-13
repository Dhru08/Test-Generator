import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Number from './pages/Number';
import Array from './pages/Array';
import String from './pages/String';
import Tree from './pages/Tree';
import GraphComponent from './pages/Graph';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/number' element={<Number />} />
                        <Route exact path='/array' element={<Array />} />
                        <Route exact path='/string' element={<String />} />
                        <Route exact path='/tree' element={<Tree />} />
                        <Route exact path='/graph' element={<GraphComponent />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;
