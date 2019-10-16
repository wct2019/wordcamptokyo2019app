import React from 'react';
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
    email: 'user4@ppp.qqq',
    key: 'testtest',
    isLoading: false,
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
/*
  async function storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      // eslint-disable-next-line
      console.log('Async ' + key + ' saved');
    } catch (e) {
      // saving error
      // eslint-disable-next-line
      console.log('Async ' + key + ' error', e);
    }
  }
*/
  // eslint-disable-next-line
  handleSubmit() {
    /*
    firebase.auth().sendSignInLinkToEmail(this.state.email, actionCodeSettings)
      .then(function() {
        storeData('emailForSignIn', this.state.email);
      })
    .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
    });
    */
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
入場に使用されるQRコードが表示されます。
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
