import React, { Component } from 'react';
import { Button, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { logout } from '../../actions'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  logout = () => {
    console.log("logout called")
    this.props.actions.logout();
    // window.location.href = '/#/login'
    this.props.headerProps.replace('/login');
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: require('../../assets/logo.png'), width: 89, height: 35, alt: 'CoreUI Logo' }}
        />

        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
            <Button onClick={() => this.logout()}>Logout</Button>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logout
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);

