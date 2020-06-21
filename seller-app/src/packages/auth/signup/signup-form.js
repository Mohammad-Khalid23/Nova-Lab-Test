import React from "react";
import Toast from 'react-native-root-toast';
import { View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from 'react-native-elements'
import { isValid } from "../../../common/utils/form-validators";
import { signupFormValidator } from "./validators";
const styles = {
    signupButton: {
        marginTop: 30,
    },
    errorText: {
        fontSize: 13,
        color: 'red',
        textAlign: 'right',
        marginTop: -15,
    }
};

class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signupData: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            errors: {
                firstName: false,
                lastName: false,
                email: false,
                password: false
            },
        };

        this.componentRefs = {}
    }

    handleValidation = (name) => {
        this.setState({
            errors: signupFormValidator(name, this.state)
        })
    };


    handleChange = (value, name) => {
        this.setState({
            signupData: {
                ...this.state.signupData,
                [name]: value,
            }
        }, () => {
            this.handleValidation(name)
        }
        )
    };

    onSignup = () => {
        if (!(this.props.isFetching || !isValid(this.state.errors, this.state.signupData))) {
            this.props.onSignup(this.state.signupData)
        } else {
            Toast.show('Please insert credentials', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red'
            });
        }
    };

    render() {
        return (
            <View>
                <Input
                    leftIcon={{ type: 'Entypo', name: 'person' }}
                    placeholder={'Firstname'}
                    onChangeText={(text) => this.handleChange(text.trim(), 'firstName')}
                    keyboardType={'default'}
                    textContentType={'name'}
                    errorMessage={this.state.errors.firstName ? 'Please enter a valid firstname' : ''}
                    errorStyle={{ color: 'red' }}
                />
                <Input
                    leftIcon={{ type: 'Entypo', name: 'person' }}
                    placeholder={'Lastname'}
                    onChangeText={(text) => this.handleChange(text.trim(), 'lastName')}
                    keyboardType={'default'}
                    textContentType={'name'}
                    errorMessage={this.state.errors.lastName ? 'Please enter a valid lastname' : ''}
                    errorStyle={{ color: 'red' }}
                />
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
                        title={'Signup'}
                        loading={this.props.isFetching}
                        style={styles.signupButton}
                        onPress={this.onSignup}
                    />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={()=>this.props.onLoginPress()}>
                        <Text style={{textDecorationLine:'underline'}}>Login </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}


export default SignupForm;