import React from "react";
import Toast from 'react-native-root-toast';
import { View ,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
import { toggleDrawer } from "../../common/utils/navigation";
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Header, Text, Button, Icon ,ListItem } from "react-native-elements";
import { sellerOperations } from './duck/index';

class TimeSlots extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          timeSlots:[],
          isBookingSlot : false,
          isFetching:false,
          refreshing: false
            }
    }
    componentDidMount(){
      const { sellerID } = this.props.navigation.state.params;
      this.setState({
        sellerID,
        isFetching:true
      })
      console.log('seller in didi mount',sellerID,this.props.navigation.state.params)
      this.fetchTimeSlots(sellerID);
    }

    fetchTimeSlots = async (id)=>{
      try {
        console.log('seller id',id);
        let timeSlots = await  this.props.actions.fetchAllTimeSlots(id);
        console.log('all time slot',timeSlots);
        this.setState({
          timeSlots : timeSlots.data,
          isFetching:false,
          refreshing: false
        })
      } catch (error) {
        this.setState({
          isFetching:false,
          refreshing: false
        })
        console.log('error in time slots',error);
     `` }
    }

    bookTimeSlot = async (data)=>{
      try {
        console.log('Book time slot data',data);
        let bookingData = {
          seller: data.seller,
          timeSlot: data._id
        }
        let createBookingResponse = await this.props.actions.createBooking(bookingData); 
        console.log('create Booking Response',createBookingResponse);
        Toast.show('Slot booked successfully', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor:'green'
      });
        this.fetchTimeSlots(this.state.sellerID);
      } catch (error) {
        console.log('error in create',error);
        Toast.show('Error in slot booking', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor:'green'
      });
      }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item,index }) => (
      <ListItem
        // title={`Slot#${index + 1}`}
        leftElement={
          <Text>{`Slot#${index + 1}`}</Text>
        }
        title = {`${moment((item.startTime)).format('h:mm a')} to ${moment((item.endTime)).format('h:mm a')}`}
        bottomDivider
        rightElement={
        <Button
          disabled={!item.isAvailable}
          onPress={()=>this.bookTimeSlot(item)}
          containerStyle={{ width: '25%', margin: 10 }}
          title={item.isAvailable ? 'Book' : 'Booked'}
          type="outline"
        />}
        />
    )

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
                    centerComponent={{ text: 'Time Slots', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', underlayColor: '#3488C0', onPress: () => this.props.navigation.goBack(), }}
            />
            {
              this.state.isFetching ?
                <ActivityIndicator style={{ flex: 1,marginTop:'50%' }} size="large" />
                :
                <View>
                  {
                    this.state.timeSlots.length ?
                      <FlatList
                        contentContainerStyle={{ justifyContent: 'center' }}
                        keyExtractor={this.keyExtractor}
                        data={this.state.timeSlots}
                        renderItem={this.renderItem}
                        refreshControl={
                          <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh}
                          />
                      }
                      />
                      :
                      <Text style={{ fontSize: 18, textAlign: 'center', marginTop: '50%' }}>Sorry this Seller has no Time Slot</Text>
                  }
                </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
          fetchAllTimeSlots : sellerOperations.fetchTimeSlots,
          createBooking : sellerOperations.createBooking
        }, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TimeSlots)