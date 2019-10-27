import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';
import decNumRefToString from '../components/decNumRefToString';

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
    // console.log('speaker data');
    // console.log(speakerItem);
    let avaterurl = '';
    if (speakerItem.avatar_urls !== undefined) {
      Object.keys(speakerItem.avatar_urls).forEach((key) => {
        // eslint-disable-next-line
        // console.log(key + "：" + speakerItem.avatar_urls[key] );
        if (speakerItem.avatar_urls[key] !== undefined) {
          avaterurl = speakerItem.avatar_urls[key].toString();
        }
      });
    }
    let profileTxt = '';
    if (speakerItem.content.rendered !== undefined) {
      profileTxt = speakerItem.content.rendered.toString()
        .replace(/\n/g, '')
        .replace(/<br>/g, '\n')
        .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      profileTxt = decNumRefToString(profileTxt);
    }
    return (
      <View style={styles.container}>
        <Text selectable style={styles.titleText}>
          { decNumRefToString(speakerItem.title.rendered.toString()) }
        </Text>
        <View style={styles.speakerImage}>
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
        </View>
        <Text selectable style={styles.description}>{ profileTxt }</Text>
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
  titleText: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
    marginHorizontal: 16,
  },
  speakerImage: {
    marginTop: 16,
    alignItems:'center',
    justifyContent:'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    marginTop: 8,
    marginHorizontal: 16,
  },
});
export default SpeakerProfileScreen;
