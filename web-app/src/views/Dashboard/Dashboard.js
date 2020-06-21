import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  PaginationItem,
  PaginationLink,
  Button,
  Row,
  Table,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { toast } from 'react-toastify';
import TimeRange from 'react-time-range';
import moment from 'moment';
import { addTimeSlot ,getTimeSlots } from '../../actions/index';
import '../../scss/UserDetails/UserDetails.css';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventModal: false,
      modalSubmit: true,
      page: 1,
      pagination: {
        pages: ''
      },
      userDetails: {
        first_name:'khalid',
        last_name:'ayub',
        email:'a@b.com'
      },
      addTimeSlotModal: false,
      startTime : new Date(),     
      endTime : new Date(),
      allTimeSlots : []
    }
  }

  componentWillMount(){
    console.log('=============mount',this.props.user);
    if(this.props.user) this.getAllTimeSlots(this.props.user);
  }
 
  getAllTimeSlots = async (user)=>{
    try {
      let allTimeSlots = await this.props.actions.getTimeSlots(user._id);
      console.log('Time Slots',allTimeSlots);
      this.setState({
        allTimeSlots : allTimeSlots.data
      })
    } catch (error) {
      toast.error("Error Get Time Slot !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }
  componentWillReceiveProps(newProps){
    console.log('new props',newProps);
    if (newProps.user) this.getAllTimeSlots(newProps.user);

  }

  addTimeSlot =async () => {
    try {
      let { startTime ,endTime } = this.state;
      let data = {
        startTime : new Date(startTime),
        endTime : new Date(endTime)
      };
      let response = await this.props.actions.addTimeSlot(data);
      this.setState({
        addTimeSlotModal:false
      },()=>this.getAllTimeSlots());
    } catch (error) {
      toast.error("Error Add Time Slot !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  closeAddTimeSlotModal = () => {
    this.setState({ addTimeSlotModal: false })
  }
  onTimeChange = (time) =>{
      console.log('time ---',time)
    this.setState({ ...time },()=> console.log('state',this.state))
    }

  render() {
    const _avatar = require('../../assets/avatar.png')
    const { user } = this.props;
    return (
      <div>
        <div>
          <div className="userInfoDiv">
            <Row>
              <Col md="1" sm="12">
                <img alt="user" src={_avatar} className="userImage" />
              </Col>
              <Col md="3" sm="12" className="username_email_col">
                <div>
                  <h3>{(user && user.firstName) && user.firstName } { (user && user.lastName) && user.firstName}</h3>
                  <p>
                    <span className="name_email_span">{(user && user.email) && user.email}</span>
                  </p>
                </div>
              </Col>
              <Col md="8" sm="12" className="verified_Col">
                <Button className="addSlotButton" onClick={() => this.setState({ addTimeSlotModal: true })}>
                  <i className="iconStyle"></i>
                  <span className="boldText">Add Time Slot</span>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="animated fadeIn">

          <div className="row">
            <div className="col-lg-12" style={{ marginBottom: '20px' }}>
              <div className="card">
                <div className="card-header">
                  <div className="row" style={{ alignItems: 'center' }}>
                    <div className="col-md-6 padding-top-6" style={{ textAlign: 'left' }}>
                      <i className="fa fa-users"></i> Time Slots
          </div>
                  </div>
                </div>
                <div className="card-block">
                  <Table className="table" hover>
                    <thead>
                      <tr>
                        <th>Created At</th>
                        <th>Start Date & Time</th>
                        <th>End Date & Time</th>
                        <th>Availibility</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {
                        (this.state.allTimeSlots && this.state.allTimeSlots.length > 0) &&
                        this.state.allTimeSlots.map((item, i) => {
                          return (
                              <tr key={item._id} className={{}}>
                                <td className="borderBottomColor">{moment(item.created_at).format('YYYY-MM-DD, hh:mm a')}</td>
                                <td className="borderBottomColor">{moment(item.startTime).format('YYYY-MM-DD, hh:mm a')}</td>
                                <td className="borderBottomColor">{moment(item.endTime).format('YYYY-MM-DD, hh:mm a')}</td>
                                <td className="borderBottomColor">{!item.isAvailable ? 'Available':'Engage'}</td>
                              </tr>
                          )
                        })}
                    </tbody>
                  </Table>

                </div>
              </div>
            </div>
          </div>
        </div >
       {
          this.state.addTimeSlotModal &&
        <div>
          <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
          <Modal isOpen={this.state.addTimeSlotModal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.closeAddTimeSlotModal}>Add Time Slot</ModalHeader>
            <ModalBody>
                <div>
                  <TimeRange
                    startMoment={this.state.startTime}
                    endMoment={this.state.endTime}
                    onStartTimeChange ={(time)=>this.onTimeChange(time)}
                    onEndTimeChange ={(time)=>this.onTimeChange(time)}
                    onChange={this.returnFunction}
                  />
                </div>
          </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addTimeSlot}>Add</Button>{' '}
              <Button color="secondary" onClick={this.closeAddTimeSlotModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      }
      </div>

    );

  }
}

function mapStateToProps(state) {
  console.log('Redux State',state);
  return {
    user: state.auth.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addTimeSlot , getTimeSlots
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
