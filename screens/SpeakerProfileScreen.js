import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';

class SpeakerProfileScreen extends React.Component {
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
        <Text>名前</Text>
        <Image
          source={
            // eslint-disable-next-line
            __DEV__
              ? require('../assets/images/robot-dev.png')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
        <Text>プロフィール</Text>
      </View>
    );
  }
}

SpeakerProfileScreen.navigationOptions = {
  title: 'Speaker',
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

});
export default SpeakerProfileScreen;
