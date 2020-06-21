import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMe } from '../../actions'
import {
  AppAside,
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  // AppFooter,
  // AppSidebarFooter,
  // AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
// import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {

  componentWillMount() {
    let token = localStorage.getItem('token')
    console.log(token, "TOKEN+++++++++++++++++++++++++++++++++++++++++++++")
    if (token) {
      this.props.actions.getMe(token)
      .then((data) => {
        console.log(data, "ME DATA RESPONSE")
      }, (error) => {
        console.log(error.response, 'UNAUTHORIRED')
        this.props.history.replace('login')

      })
    }else{
      this.props.history.replace('login')
    }
  }
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader headerProps={this.props.history} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            {/* <AppSidebarForm /> */}
            <AppSidebarNav navConfig={navigation} {...this.props} />
            {/* <AppSidebarFootegetItemr /> */}
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                },
                )}
                {
                  localStorage.getItem('token') ?
                    <Redirect from="/" to="/dashboard" /> :
                    <Redirect from="/" to="/login" />}
                }
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getMe
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
