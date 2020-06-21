import { createDrawerNavigator, createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import CustomDrawerContentComponent from "../common/components/drawer";
import LoginContainer from "../packages/auth/login/login-container";
import SignupContainer from "../packages/auth/signup/signup-container";
import SellerList from "../packages/sellers/seller-list";
import TimeSlots from "../packages/sellers/time-slots";
import MyBookings from '..//packages/myBookings/my-booking-list';



// Auth stack for non-authenticate components
const AuthStack = createStackNavigator({
    Login: {
        screen: LoginContainer,
        path: '/login',
        navigationOptions: ({ navigation }) => ({
            ...navigation,
        })
    },
    Signup: {
        screen: SignupContainer,
        path: '/signup',
        navigationOptions: ({ navigation }) => ({
            ...navigation,
        })
    }
}, {
        headerMode: 'none',
        initialRouteName:'Signup'
    });


// Explore stack for authenticate components
const DashboardStack = createStackNavigator({
    Sellers: {
        screen: SellerList,
        path: '/sellers',
        navigationOptions: ({ navigation }) => ({
            ...navigation,
        })
    },
    TimeSlots: {
        screen: TimeSlots,
        path: '/timeSlots',
        navigationOptions: ({ navigation }) => ({
            ...navigation,
        })
    },
    MyBookings: {
        screen: MyBookings,
        path: '/myBookings',
        navigationOptions: ({ navigation }) => ({
            ...navigation,
        })
    },
}, {
    headerMode: 'none',
});

// App Stack after authentication
const AppStack = createSwitchNavigator({
    Dashboard: DashboardStack,
});

const RouteConfigs = () => ({
    App: AppStack
});

// Drawer config
const DrawerNavigatorConfig = () => ({
    initialRouteName: 'App',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerType: 'front'
});

const AppDrawerStack = createDrawerNavigator(RouteConfigs(), DrawerNavigatorConfig());

const MainStack = createAppContainer(createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    App: AppDrawerStack,
    Auth: AuthStack
}, {
        initialRouteName: 'Auth',
    })
);

export default MainStack;

