import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { login, getMe } from '../../../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginProcess: false
    }
  }
  componentWillMount() {
    console.log("props in app js",this.props);
    let token = localStorage.getItem('token');
    if(token){
      this.props.history.replace('/dashboard')
    }
  }


  validateEmail = (email) => {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  login = () => {
    this.setState({ loginProcess: true }, () => {
      if (!this.state.email) {
        toast.error('Please Enter Email', {
          position: toast.POSITION.TOP_CENTER
        });
        this.setState({ loginProcess: false })
        return
      }
      else if (!this.validateEmail(this.state.email)) {
        toast.error('Please Enter Valid Email', {
          position: toast.POSITION.TOP_CENTER
        });
        this.setState({ loginProcess: false })
        return
      }
      else {
        this.props.actions.login({
          email: this.state.email,
          password: this.state.password,
          role:'seller'
        }).then((data) => {
          console.log("Response DATA", data);
          localStorage.setItem('token',data.data.access_token);
            this.props.history.replace('/dashboard')

        }, (err) => {
          console.log("Response err", err.response)
          this.setState({ loginProcess: false })
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
        })
        console.log("LOGIN CALLED")
      }
    })
  }

  setFeilds(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
    })
  }


  disableButton = () => {
    if (this.state.email && this.state.password) {
      return false
    }
    else {
      return true
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" placeholder="Email" onChange={(e) => this.setFeilds(e)} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" placeholder="Password" onChange={(e) => this.setFeilds(e)} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button disabled={this.disableButton() || this.state.loginProcess} color="primary" className="px-4" onClick={() => this.login()}>Login</Button>
                      </Col>
                      {/* <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col> */}
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
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
      login, getMe
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
