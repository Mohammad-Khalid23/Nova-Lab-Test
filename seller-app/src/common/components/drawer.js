import React from "react";
import { SafeAreaView } from 'react-navigation';
import { ScrollView, StyleSheet, View, Alert ,AsyncStorage } from "react-native";
import { Avatar, ListItem, Divider } from "react-native-elements";



const styles = StyleSheet.create({
    root: {
        height: '100%',
    },
    container: {
        flex: 1,
    }
});


class CustomDrawerContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    name: 'Sellers',
                    icon: 'home',
                    iconType: 'FontAwesome'
                },
                {
                    name: 'My Bookings',
                    icon: 'book',
                    iconType: 'FontAwesome'
                },
                {
                    name: 'Logout',
                    icon: 'home',
                    iconType: 'FontAwesome'
                }
            ]
        }
    }
    logout = async ()=>{
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('Auth');
    }

    onListItemPress = (item) => {
        if (item.name === 'Logout') {
            Alert.alert(
                'Logout',
                'Are you sure want to logout?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { }
                    },
                    {
                        text: 'Yes',
                        onPress: () => { this.logout()}
                    }
                ]
            )
        } else if (item.name === 'Sellers') {
            this.props.navigation.navigate('Sellers')
        } else if (item.name === 'My Bookings') {
            this.props.navigation.navigate('MyBookings')
        }
    }

    render() {
        return (
            <ScrollView style={styles.root}>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={{ padding: 10, alignItems: 'center' }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                            }}
                        />
                    </View>
                    <View>
                        {
                            this.state.list.map((item, index) =>
                                (
                                    <View key={index}>
                                        <ListItem
                                            leftIcon={{ type: item.iconType, name: item.icon }}
                                            title={item.name}
                                            onPress={() => this.onListItemPress(item)}
                                        />
                                        <Divider />
                                    </View>
                                )
                            )
                        }
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default CustomDrawerContentComponent;