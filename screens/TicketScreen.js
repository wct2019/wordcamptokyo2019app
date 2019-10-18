import React from 'react';
import { SecureStore } from 'expo';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import LogoTitle from '../navigation/LogoTitle';

class TicketScreen extends React.Component {
  state = {
    email: '',
    key: 'testtest',
    isLoading: false,
    actionCodeSettings: '',
  }

  async componentDidMount() {
    this.state.actionCodeSettings = {
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
      dynamicLinkDomain: 'example.page.link',
    };
    // check login status
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          const provider = new firebase.auth.GoogleAuthProvider();
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
                      console.log(error);
                    }
                  });
              } else {
                // not a sign-in link - must be some other type of link
              }
            });
*/

          if (firebase.auth().isSignInWithEmailLink(this.state.email, link)) {
            const email = SecureStore.getItemAsync('emailForSignIn');
            if (!email) {
              // email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(this.state.email, link)
              .then((result) => {
                try {
                  SecureStore.deleteItemAsync('emailForSignIn');
                } catch (error) {
                  console.log(error);
                }
              })
          }
        });
    } catch (e) {
      console.log(e);
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
        <Text style={styles.title}>
          チケット認証
        </Text>
        <Text style={styles.article}>
チケット購入時に使用されたメールアドレスを入力し、「チケットを認証する」ボタンを押してください。
確認のメールが配信されますので、届いたメールのリンクより認証を完了してください。
認証が完了すると、入場に使用されるQRコードが表示されます。
        </Text>

        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#C70F66">
          <Text style={styles.buttonTitle}> チケットを認証する</Text>
        </TouchableHighlight>
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
