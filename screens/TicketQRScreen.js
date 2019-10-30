import React from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import LogoTitle from '../navigation/LogoTitle';
import {
  signOut,
  sendPasswordResetEmail,
  verifyEmail,
  getTicketID,
} from '../redux';

class TicketScreen extends React.Component {
  state = {
    email: '',
    // eslint-disable-next-line
    ticketID: 'testtest',
    // eslint-disable-next-line
    isLoading: false,
    emailVerified: false,
    messageText: '',
    QRText: '',
  }

  constructor(props) {
    super(props);
    this.goToList = this.goToList.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangePhoneNumberVerificationCode = this.onChangePhoneNumberVerificationCode.bind(this);
    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.confirmPhoneNumberVerification = this.confirmPhoneNumberVerification.bind(this);
    const { user } = props;
    this.state = {
      user,
    };
  }

  componentDidMount() {
    const { user } = this.state;
    if (!user.emailVerified) {
      this.props.verifyEmail();
      this.setState({ emailVerified: false });
    } else {
      this.setState({ emailVerified: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user !== this.state.user) {
      this.setState({
        user: nextProps.user,
      });
    }
  }

  render() {
    const {
      dbUser,
      signOut,
      verifyEmail,
      sendPasswordResetEmail,
    } = this.props;
    const { user } = this.state;
    const { ticketID } = getTicketID();
    if (ticketID === null) {
      this.setState({ messageText: 'チケットが見つかりません。メールアドレスが正しいかご確認ください。登録メールアドレスが不明な場合はスタッフにお問い合わせください。'});
    } else if (this.state.emailVerified) {
      this.setState({ messageText: 'このQRコードを受付に提示してください。' });
      QRText = 'https://2019.tokyo.wp-checkin.com/ticket/' + ticketID.toString();
    } else {
      this.setState({ messageText: 'メールアドレスの認証が完了していません。' });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        入場チケット
        </Text>
        <Text style={styles.article}>
          { this.state.messageText }
        </Text>

        <QRCode
          value={this.state.QRText}
          size={250}
          bgColor="black"
          fgColor="white"
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
