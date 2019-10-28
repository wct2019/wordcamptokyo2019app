import React from 'react';
// import { SecureStore } from 'expo';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import LogoTitle from '../navigation/LogoTitle';

class TicketScreen extends React.Component {
  state = {
    email: '',
    // eslint-disable-next-line
    key: 'testtest',
    // eslint-disable-next-line
    isLoading: false,
    actionCodeSettings: '',
  }

  async componentDidMount() {
    this.state.actionCodeSettings = {
      url: 'https://wordcamptokyo2019app.firebaseapp.com/action.html',
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
    // check login status
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          // const provider = new firebase.auth.GoogleAuthProvider();
          const link = '';
          /*
          firebase.links()
            .getInitialLink()
            .then((url) => {
              if (firebase.auth().isSignInWithEmailLink(url)) {
                // call signInWithEmailLink or make a credential from the url using
                // firebase.auth.EmailAuthProvider.credentialWithLink(email, url)
                // and use any of the credential based auth flows with it, e.g. linkWithCredential
                const email = SecureStore.getItemAsync('emailForSignIn');
                if (!email) {
                  // Todo: no email →再入力
                }
                firebase.auth.EmailAuthProvider.credentialWithLink(email, url);
                // The client SDK will parse the code from the link for you.
                firebase.auth().signInWithEmailLink(this.state.email, link)
                  .then((result) => {
                    try {
                      SecureStore.deleteItemAsync('emailForSignIn');
                    } catch (error) {
                      // console.log(error);
                    }
                  });
              } else {
                // not a sign-in link - must be some other type of link
              }
            });
*/

          if (firebase.auth().isSignInWithEmailLink(this.state.email)) {
            const email = SecureStore.getItemAsync('emailForSignIn');
            if (!email) {
              // email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(this.state.email, link)
              // eslint-disable-next-line
              .then((result) => {
                try {
                  SecureStore.deleteItemAsync('emailForSignIn');
                } catch (error) {
                  // console.log(error);
                }
              });
          }
        });
    } catch (e) {
      // console.log(e);
    }
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
  確認のメールが配信されますので、届いたメールのリンクより認証を完了してください。
  認証が完了すると、入場に使用されるQRコードが表示されます。
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(text) => { this.setState({ email: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="メールアドレスを入力してください"
          />
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonText}> チケットを認証する</Text>
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
    marginTop: 32,
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
export default TicketScreen;
