import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';

class SessionsDetailScreen extends React.Component {
  state = {
    sessions: {},
    speakers: {},
    selectedSession: {},
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ sessions: params.sessions });
    this.setState({ speakers: params.speakers });
    this.setState({
      selectedSession: params.selectedSession,
    });
    console.log('sessions1');
    console.log(params.sessions);
    console.log('sessions2');
    console.log(this.state.sessions);
    console.log('selectedSession1');
    console.log(params.selectedSession);
    console.log('selectedSession2');
    console.log(this.state.selectedSession.id);
    console.log('speakers');
    console.log(params.speakers);
  }

  renderSpeakerLink(speaker) {
    let speakerName = '';
    if (speaker.item.speakername.rendered !== undefined) {
      speakerName = speaker.item.speakername.rendered.toString();
    }
    let speakerId = '';
    if (speaker.item.speakerid !== undefined) {
      speakerId = speaker.item.speakerid.toString();
    }
    console.log('speaker');
    console.log(speaker);
    console.log('speakerName');
    console.log(speakerName);
    return (
      <TouchableHighlight onPress={() => { this.props.navigation.navigate('SpeakerProfile', { speakers: this.state.speakers, speakerid: speakerId }); }}>
        <Text>
          { speakerName }
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { selectedSession } = this.state;
    console.log('selectedSession3');
    console.log(selectedSession);
    let sessionDescription = '';
    if (selectedSession.content.rendered !== undefined) {
      sessionDescription = selectedSession.content.rendered.toString()
        .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
        .replace(/\n\n/g, '\n');
    }
    let roomName = '';
    if (selectedSession.room_name !== undefined) {
      roomName = selectedSession.room_name.toString()
        // eslint-disable-next-line
        .replace(/[\(\（\)\）]/g, '')
        .replace(/\n\n/g, '\n');
    }


    return (
      <View style={styles.container}>

        <Text>
          { selectedSession.title.rendered !== undefined ? selectedSession.title.rendered.toString() : '' }
        </Text>
        <Text>
          開始時間：
          { selectedSession.session_date_time.time !== undefined ? selectedSession.session_date_time.time.toString() : '' }
        </Text>
        <Text>
          会場：
          { roomName }
        </Text>
        <Text>
          講演者：
        </Text>
        <FlatList
          data={selectedSession.speaker_name}
          renderItem={this.renderSpeakerLink.bind(this)}
          keyExtractor={(speaker, index) => index.toString()}
        />
        <Text>{ sessionDescription }</Text>
      </View>
    );
  }
}

SessionsDetailScreen.navigationOptions = {
  title: 'セッション',
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
export default SessionsDetailScreen;
