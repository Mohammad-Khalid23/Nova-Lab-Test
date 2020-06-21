import React from "react";
import Toast from 'react-native-root-toast';
import { View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from 'react-native-elements'
import { isValid } from "../../../common/utils/form-validators";
import { loginFormValidator } from "./validators";
const styles = {
    loginButton: {
        marginTop: 30,
    },
    errorText: {
        fontSize: 13,
        color: 'red',
        textAlign: 'right',
        marginTop: -15,
    }
};

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginData: {
                email: '',
                password: ''
            },
            errors: {
                email: false,
                password: false
            },
        };

        this.componentRefs = {}
    }

    handleValidation = (name) => {
        this.setState({
            errors: loginFormValidator(name, this.state)
        })
    };


    handleChange = (value, name) => {
        this.setState({
            loginData: {
                ...this.state.loginData,
                [name]: value,
            }
        }, () => {
            this.handleValidation(name)
        }
        )
    };

    onLogin = () => {
        if (!(this.props.isFetching || !isValid(this.state.errors, this.state.loginData))) {
            this.props.onLogin(this.state.loginData)
        }else{
            Toast.show('Please insert credentials', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor:'red'
            });
        }
    };

    render() {
        return (
            <View>
                <Input
                    leftIcon={{ type: 'Entypo', name: 'email' }}
                    placeholder={'Email'}
                    onChangeText={(text) => this.handleChange(text.trim(), 'email')}
                    keyboardType={'email-address'}
                    textContentType={'emailAddress'}
                    errorMessage={this.state.errors.email ? 'Please enter a valid email address' : ''}
                    errorStyle={{ color: 'red' }}
                />
                <Input
                    leftIcon={{ type: 'Entypo', name: 'lock' }}
                    placeholder={'Password'}
                    onChangeText={(text) => this.handleChange(text, 'password')}
                    secureTextEntry={true}
                    textContentType={'password'}
                    errorMessage={this.state.errors.password ? 'Please enter password' : ''}
                    errorStyle={{ color: 'red' }}
                />
                <View style={{ marginVertical: 15 }}>
                <Button
                    title={'Login'}
                    loading={this.props.isFetching}
                    style={styles.loginButton}
                    onPress={this.onLogin}
                />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text>Create an account? </Text>
                    <TouchableOpacity onPress={()=>this.props.onSignupPress()}>
                        <Text style={{textDecorationLine:'underline'}}>Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}


export default LoginForm;