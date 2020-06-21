import React from "react";
import Toast from 'react-native-root-toast';
import { View ,FlatList,RefreshControl } from 'react-native';
import { toggleDrawer } from "../../common/utils/navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sellerOperations } from './duck/index';
import { Header,SearchBar ,ListItem } from "react-native-elements";


class SellerList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          sellerList : [],
          searchText: '',
          isSearchingSeller: false,
          typingTimeout:0,
          refreshing: false
        }
    }
   componentDidMount() {
    this.fetchAllSeller();
  }
  
  fetchAllSeller = async () => {
    try {
      let sellers = await this.props.actions.fetchSellers(this.state.searchText);
      console.log('Sellers',sellers);
      this.setState({
        sellerList :sellers.data,
        isSearchingSeller:false,
        refreshing: false
      })
      
    } catch (error) {
      Toast.show('Error in fetch seller', {
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
  };
    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
        title={`${item.firstName} ${item.lastName}`}
            subtitle={item.subtitle}
            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
            bottomDivider
            chevron
        onPress={() => !this.state.isSearchingSeller && this.props.navigation.navigate('TimeSlots', { sellerID: item._id })}
        />
    );

    searchSeller = (text) => {
      const self = this;
  
      if (self.state.typingTimeout) {
        clearTimeout(self.state.typingTimeout);
      }
  
      self.setState({
        searchText: text,
        isSearchingSeller: true,
        typingTimeout: setTimeout(function () {
          console.log('search text', text)
          self.fetchAllSeller(self.state.searchText)
        }, 2000)
      });
    }

    _onRefresh = () => {
      this.setState({ refreshing: true });
      this.fetchAllSeller();
  }

    render() {
      const { search } = this.state;
        return (
            <View>
                <Header
                    statusBarProps={{
                        barStyle: 'light-content', translucent: true, backgroundColor: 'transparent'
                    }}
                    centerComponent={{ text: 'Sellers', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'menu', color: '#fff', underlayColor: '#3488C0', onPress: () => toggleDrawer(this.props.navigation), }}
                />
                <View>
                    <SearchBar
                      placeholder="Search Seller"
                      onChangeText={this.searchSeller}
                      value={this.state.searchText}
                      showLoading={this.state.isSearchingSeller}
                    />
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.sellerList}
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
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
          fetchSellers : sellerOperations.fetchSellers
        }, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(SellerList)