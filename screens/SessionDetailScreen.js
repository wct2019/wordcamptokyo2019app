import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';
import decNumRefToString from '../components/decNumRefToString';

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
        <Text style={styles.speakerName}>
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
        .replace(/\n/g, '')
        .replace(/<br>/g, '\n')
        .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
      sessionDescription = decNumRefToString(sessionDescription);
    }
    let roomName = '';
    if (selectedSession.room_name !== undefined) {
      roomName = selectedSession.room_name.toString()
        // eslint-disable-next-line
        .replace(/[\(\（\)\）]/g, '')
        .replace(/\n/g, '');
    }

    return (
      <View style={styles.container}>

        <Text style={styles.titleText}>
          { selectedSession.title.rendered !== undefined ? decNumRefToString(selectedSession.title.rendered.toString()) : '' }
        </Text>
        <View style={styles.sessionsPropertyItem}>
          <Text style={styles.time}>
            { selectedSession.session_date_time.time !== undefined ? selectedSession.session_date_time.time.toString() : '' }
             開始
          </Text>
          <Text style={styles.room}>
            会場：
            { roomName }
          </Text>
        </View>
        <Text style={styles.speakerTitle}>
          登壇者
        </Text>
        <View style={styles.spealerBox}>
          <FlatList
            data={selectedSession.speaker_name}
            renderItem={this.renderSpeakerLink.bind(this)}
            keyExtractor={(speaker, index) => index.toString()}
          />
        </View>
        <Text style={styles.description}>{ sessionDescription }</Text>
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
  titleText: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
    marginHorizontal: 16,
  },
  sessionsPropertyItem: {
    flexDirection: 'row',
    padding: 16,
    marginTop: 16,
    alignItems:'center',
    justifyContent:'center',
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginHorizontal: 24,
  },
  room: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F29D5E',
    marginHorizontal: 24,
  },
  speakerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C9060',
    marginHorizontal: 24,
  },
  speakerName: {
    fontSize: 18,
    color: '#D69D12',
    marginHorizontal: 24,
    textDecorationLine: 'underline',
  },
  spealerBox: {
    fontSize: 18,
    color: '#D69D12',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    marginTop: 8,
    marginHorizontal: 16,
  },
});
export default SessionsDetailScreen;
