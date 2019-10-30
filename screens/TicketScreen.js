import React from 'react';
// import { SecureStore } from 'expo';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';
import { connect, Provider } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import LogoTitle from '../navigation/LogoTitle';
import { store, authUser, signIn } from '../redux';

class TicketScreen extends React.Component {
  state = {
    email: '',
    // eslint-disable-next-line
    key: 'testtest',
    // eslint-disable-next-line
    isLoading: false,
    actionCodeSettings: '',
  }

  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signIn = this.signIn.bind(this);
    this.auth = this.auth.bind(this);
    this.authGoogle = this.authGoogle.bind(this);
    this.state = {
      email: null,
      password: null,
    };
  }

  async componentDidMount() {
    const actionCodeSettings = {
      url: 'https://wct19.compin.jp/at/6SuK',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'jp.compin.wordcamptokyo2019app',
      },
      android: {
        packageName: 'jp.compin.wordcamptokyo2019app',
        installApp: true,
        minimumVersion: '12',
      },
    };
    this.setState({ actionCodeSettings });
  }

  onChangeEmail(email) {
    this.setState({ email });
  }

  onChangePassword(password) {
    this.setState({ password });
  }

  signIn() {
    signIn = this.props;
    const { email, password } = this.state;
    signIn(email, password);
  }

  auth() {
    authUser = this.props;
    const { email, password } = this.state;
    authUser(email, password);
  }

  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  // eslint-disable-next-line
  handleSubmit() {
    // console.log('submit new');
    firebase.auth().sendSignInLinkToEmail(this.state.email, this.state.actionCodeSettings)
      .then(() => {
        SecureStore.setItemAsync('emailForSignIn', this.state.email);
      })
      .catch((error) => {
        console.log(error);
        console.log(this.state.email);
        console.log(this.state.actionCodeSettings);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.article}>
  チケット購入時に使用されたメールアドレスを入力し、「チケットを認証する」ボタンを押してください。
          </Text>
          <Text style={styles.article}>
  パスワードはチケットの再表示に必要です。8文字以上のパスワードを設定してください。
          </Text>
          <Text style={styles.article}>
  確認のメールが配信されますので、届いたメールのリンクより認証を完了してください。
  認証が完了すると、入場に使用されるQRコードが表示されます。
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            // onChangeText={(text) => { this.setState({ email: text }); }}
            onChangeText={this.onChangeEmail}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            placeholder="メールアドレスを入力してください"
          />
          <TextInput
            style={styles.input}
            value={this.state.Password}
            // onChangeText={(text) => { this.setState({ Password: text }); }}
            onChangeText={this.onChangePassword}
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            placeholder="パスワード"
            secureTextEntry
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.auth}
            // disabled={!(email && password)}
          >
            <Text style={styles.buttonText}> 新規登録</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this.signIn}
            // disabled={!(email && password)}
          >
            <Text style={styles.buttonText}> ログイン</Text>
          </TouchableHighlight>
        </View>
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
    backgroundColor: '#ffffff',
    height: 48,
    marginTop: 24,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: 340,
  },
  titleText: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 16,
  },
  article: {
    fontSize: 16,
    color: '#000000',
    marginTop: 8,
    marginHorizontal: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 128,
    marginBottom: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#D69D12',
    height: 48,
    width: 340,
    borderRadius: 6,
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 48,
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 0.32,
    color: '#FFFFFF',
  },

});

const mapStateToProps = state => ({
  user: state.user.data,
  error: state.user.authError,
});

const mapDispatchToProps = {
  authUser,
  signIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketScreen);
