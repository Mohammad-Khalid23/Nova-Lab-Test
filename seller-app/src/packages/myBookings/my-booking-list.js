import React from "react";
import { View ,FlatList ,RefreshControl} from 'react-native';
import Toast from 'react-native-root-toast';
import { toggleDrawer } from "../../common/utils/navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { myBookingsOperations } from './duck/index';
import { Header,ListItem } from "react-native-elements";


class MyBookingList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          myBookingsList : [],
          refreshing: false
        }
    }
  componentDidMount() {
    this.fetchMyBookingList()
  }

  componentWillReceiveProps(newProps){
    if(newProps){
      console.log('new props',newProps);
      this.setState({
        myBookingsList : newProps.myBookings
      })
    }
  }

  fetchMyBookingList = async()=>{
    try {
      let myBookings = await this.props.actions.fetchMyBookingList();
      console.log('Booking list',myBookings);
      this.setState({
        myBookingsList: myBookings.data,
        refreshing: false
      })
      
    } catch (error) {
      this.setState({
        refreshing: false
      });
      Toast.show('Error in fetch bookings', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor:'green'
    });
      console.log('error===>',error)
    }
  }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={`${moment((item.timeSlot.startTime)).format('DD-MM-YY,h:mm a')} to ${moment((item.timeSlot.endTime)).format('DD-MM-YY,h:mm a')}`}
            subtitle={item.status}
            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
            bottomDivider
            chevron
        />
    );

    _onRefresh = () => {
      this.setState({ refreshing: true });
      this.fetchTimeSlots(this.state.sellerID);
  }

    render() {
        return (
            <View>
                <Header
                    statusBarProps={{
                        barStyle: 'light-content', translucent: true, backgroundColor: 'transparent'
                    }}
                    centerComponent={{ text: 'My Bookings', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'menu', color: '#fff', underlayColor: '#3488C0', onPress: () => toggleDrawer(this.props.navigation), }}
                />
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.myBookingsList}
                        renderItem={this.renderItem}
                        refreshControl={
                          <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh}
                          />
                      }
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
  console.log('state in sller list',state)
    return {
        auth: state.auth,
        myBookings:state.myBookings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
          fetchMyBookingList : myBookingsOperations.fetchMyBookings
        }, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(MyBookingList)