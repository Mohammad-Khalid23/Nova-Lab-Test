import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBookingRequest , updateBookingStatus } from '../../actions'
import {
  Table ,Button
} from 'reactstrap';
import '../../scss/Events/Events.css';
import moment from "moment";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingRequestList:null
    }
  }
  componentDidMount() {
    this.getBookingRequest()
  }

  getBookingRequest = async () => {
    try {
      console.log('api call----------------')
      let boookingRequest = await this.props.actions.getBookingRequest();
      this.setState({
        bookingRequestList : boookingRequest.data
      })
    }
     catch (error) {
      console.log(error.response, "ERROR IN Booking request list")
      if (error.response.status === 401) {
        this.props.history.push('/login')
      }      
    }
  }

  acceptOrRejectBookingRequest = async (action,booking) => {
    try {
      console.log('action and data', action, booking);
      let data = {
        status: action,
        seller: booking.seller,
        timeSlot: booking.timeSlot._id,
        _id: booking._id
      }
      const  response  = await this.props.actions.updateBookingStatus(data);
      console.log('accep rejectec booking response',response);
      this.getBookingRequest()
    } catch (error) {
      console.log('eror in accept reject',error);
      if (error.response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }


  render() {
    const _avatar = require('../../assets/avatar.png');
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12" style={{ marginBottom: '20px' }}>
            <div className="card">
              <div className="card-header">
                <div className="row" style={{ alignItems: 'center' }}>
                  <div className="col-md-6 padding-top-6" style={{ textAlign: 'left' }}>
                    <i className="fa fa-users"></i> Booking Request
                  </div>
                </div>
              </div>
              <div className="card-block">
                <Table className="table" hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Start Date & Time</th>
                      <th>End Date & Time</th>
                      <th>Buyer</th>
                      <th>Status</th>
                      <th>Accept/Reject</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {
                      (this.state.bookingRequestList && this.state.bookingRequestList.length > 0) &&
                      this.state.bookingRequestList.map((item, i) => {
                        return (
                          <span style={{ display: 'contents' }}>
                            <tr key={item._id} className={item.isBlocked ? 'blockEvent' : 'event'}>
                              <td className="borderBottomColor">{i+1}</td>
                              <td className="borderBottomColor">{moment(item.timeSlot.startTime).format('YYYY-MM-DD, hh:mm a')}</td>
                              <td className="borderBottomColor">{moment(item.timeSlot.endTime).format('YYYY-MM-DD, hh:mm a')}</td>
                              <td className="borderBottomColor">{item.buyer.firstName} {item.buyer.lastName ?  item.buyer.lastName :''}</td>
                              <td className="borderBottomColor">{item.status}</td>
                              <td>
                                <Button color="primary" onClick={()=>this.acceptOrRejectBookingRequest('accepted',item)} disabled={item.status === 'accepted' || item.status === 'rejected'}>Accept</Button>
                                <Button color="danger" style={{marginLeft:10}} onClick={()=>this.acceptOrRejectBookingRequest('rejected',item)} disabled={item.status === 'accepted' || item.status === 'rejected'}>Reject</Button>
                              </td>
                            </tr>
                          </span>
                        )
                      })}
                  </tbody>
                </Table>

              </div>
            </div>
          </div>
        </div>
      </div >
    );

  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBookingRequest , updateBookingStatus
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
