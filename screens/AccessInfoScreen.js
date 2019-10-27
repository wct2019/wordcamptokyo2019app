import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';

class AccessInfoScreen extends React.Component {
  /*
  state = {
    sessionsList: [],
  }
  componentWillMount() {

  }
  */
  render() {
    return (
      <View style={styles.container}>
        <Text>Access List</Text>
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

AccessInfoScreen.navigationOptions = {
  title: 'アクセス',
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

});
export default AccessInfoScreen;
