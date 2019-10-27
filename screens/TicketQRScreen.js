import React from 'react';
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
          value={this.state.email + ',' + '12345'}
          size={250}
          bgColor='black'
          fgColor='white'
        />
        <Text>Ticket ID</Text>
        <Text>Email : xxx@xxxx.xx</Text>
        <Text>Ticket Category</Text>
        <Image
          source={
            // eslint-disable-next-line
            require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
      </View>
    );
  }
}

TicketScreen.navigationOptions = {
  title: 'チケット',
  headerTitle: <LogoTitle />,
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  headerTintColor: '#ffffff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF7E3',
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
