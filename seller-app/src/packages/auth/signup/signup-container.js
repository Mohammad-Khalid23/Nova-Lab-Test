import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { authOperations } from "../duck";
import SignupForm from "./signup-form";
import { View ,Text, ActivityIndicator,AsyncStorage,ScrollView } from "react-native";
import { Image } from "react-native-elements";

const styles = {
    root: {
        padding:20,
        paddingBottom: 20,
        height: '100%',
        width: '100%',
    },
    signupContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 45,
    }
};


class SignupContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:false
        }
    }
 async componentDidMount(){
     try {
         this.setState({
             isLoading : true
         })
         let token =  await AsyncStorage.getItem('token');
         console.log('acces_token',token)
         if (token) {
             console.log('token', token);
             let response = await this.props.actions.checkSession();
             if (response) {
                 this.props.navigation.navigate('App');
             } else {
                 this.setState({
                     isLoading: false
                 })
             }
         } else {
             this.setState({
                 isLoading: false
             })
         }
     } catch (error) {
        this.setState({
            isLoading: false
        })
        console.log('error in signup',error)
     }
 }


    onSignupPress = async (data) => {
        try {
            data.email = data.email.toLocaleLowerCase();
            data.role = 'buyer';
            console.log(data, 'data from signup')
            await this.props.actions.signup(data);
            Toast.show('Signup successfully', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor:'green'
            });
            this.props.navigation.navigate('App');
            
        } catch (error) {
            console.log('error in signup',error);
            Toast.show('Invalied Email or Password', {
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

    onLoginPress = () => {
        this.props.navigation.navigate('Login')
    };

    render() {
        const images = require('../../../common/assets/images');
        return (

            this.state.isLoading ?
                <ActivityIndicator size='large' style={{flex:1}} />
                :
                <ScrollView style={styles.root}>
                    <View style={{ marginTop:20 }}>
                        <Text style={{fontSize:35,fontWeight:'bold',alignSelf:'center'}}>Sign Up</Text>
                    </View>
                    <View style={styles.signupContainer}>
                        <SignupForm
                            navigation={this.props.navigation}
                            onSignup={this.onSignupPress}
                            isFetching={this.props.auth.isFetching}
                            onLoginPress={this.onLoginPress}
                        />
                    </View>
                </ScrollView>
        )
    }

}

function mapStateToProps(state) {
    console.log(state)
    return {
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            signup: authOperations.signUp,
            checkSession:authOperations.checkSession
        }, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SignupContainer)