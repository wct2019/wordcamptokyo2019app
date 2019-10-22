import React, { Component } from 'react'
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import LogoTitle from '../navigation/LogoTitle';

class TicketScreen extends React.Component {
  state = {
    email: 'user4@ppp.qqq',
    key: 'testtest',
    ticketid: '12345',
    text: 'https://2019.tokyo.wp-checkin.com/ticket/12345',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        入場チケット
        </Text>
        <Text style={styles.article}>
      このQRコードを受付に提示してください。
        </Text>

        <QRCode
          value={this.state.text}
          size={200}
          bgColor="purple"
          fgColor="white"
        />
        <Text>
          Email : {this.state.email}
        </Text>
      </View>
    );
  }
}

TicketScreen.navigationOptions = {
  title: 'Ticket',
  headerTitle: <LogoTitle />,
  headerStyle: {
    backgroundColor: '#2C9060',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF7E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },

});
export default TicketScreen;
