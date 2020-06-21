import React, { Component } from 'react';
import './style/Loader.css';

class Loader extends Component {

    render () {
        return (
            <div className="page-loader">
                <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                </div>
            </div>
        )
    }
}

export default Loader;
