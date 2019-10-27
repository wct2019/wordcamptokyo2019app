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
  state = {
    speakers: {},
    selectedSpeakerId: {},
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ speakers: params.speakers });
    this.setState({ selectedSpeakerId: params.speakerid });
  }

  render() {
    const speakerItem = this.state.speakers[this.state.selectedSpeakerId];
    console.log('speaker data');
    console.log(speakerItem);
    let avaterurl = '';
    Object.keys(speakerItem.avatar_urls).forEach((key) => {
      // eslint-disable-next-line
      console.log(key + "：" + speakerItem.avatar_urls[key] );
      if (speakerItem.avatar_urls[key] !== undefined) {
        avaterurl = speakerItem.avatar_urls[key].toString();
      }
    });
    let profileTxt = '';
    if (speakerItem.content.rendered !== undefined) {
      profileTxt = speakerItem.content.rendered.toString()
        .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
        .replace(/\n\n/g, '\n');
    }
    return (
      <View style={styles.container}>
        <Text selectable>
          { speakerItem.title.rendered.toString() }
        </Text>
        <Image
          source={
             { uri: avaterurl }
            // eslint-disable-next-line
            // __DEV__
            //   ? require('../assets/images/robot-prod.png')
            //   : require('../assets/images/robot-prod.png')
          }
          style={styles.profileImage}
        />
        <Text selectable>{ profileTxt }</Text>
      </View>
    );
  }
}

SpeakerProfileScreen.navigationOptions = {
  title: '講演者',
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
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
export default SpeakerProfileScreen;
