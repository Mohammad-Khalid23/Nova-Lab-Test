import React, { Component } from 'react';
// import { Router, hashHistory } from 'react-router';
// import routes from './routes';
import { connect } from 'react-redux'; //to pass functions
// import { bindActionCreators } from 'redux';
// import { } from './actions';
import App from './App'
import { ToastContainer } from 'react-toastify';
import Loader from './views/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentWillMount() {
        console.log("componentWillMount")
    }

    render() {
        let { loader } = this.props;
        return (
            <div>
                <ToastContainer autoClose={3000} />
                {loader.requestInProgress > 0 &&
                    <Loader />
                }
                <App />

            </div>

        )
    }
}

function mapStateToProps(state) {
    //pass the providers
    return {
        loader: state.loader
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Root);
