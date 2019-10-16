import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';

class SessionsDetailScreen extends React.Component {
  state = {
    sessions: {},
    speakers: {},
    selectedSession: {},
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ sessions: params.sessions });
    this.setState({ speakers: params.speakers });
    this.setState({ selectedSession: params.selectedSession });
    console.log('sessions1');
    console.log(params.sessions);
    console.log('sessions2');
    console.log(this.state.sessions);
    console.log('selectedSession1');
    console.log(params.selectedSession);
    console.log('selectedSession2');
    console.log(this.state.selectedSession.id);
  }

  render() {
    const { sessions } = this.state;
    return (
      <View style={styles.container}>

        <Text>タイトル</Text>
        <Text>開始時間：11:00</Text>
        <Text>会場：11:00</Text>
        <TouchableHighlight onPress={() => { this.props.navigation.navigate('SpeakerProfile'); }}>
          <Text>講演者：XXXXXXXXXXXXX</Text>
        </TouchableHighlight>
        <Text>Sessions Desctiption</Text>
      </View>
    );
  }
}

SessionsDetailScreen.navigationOptions = {
  title: 'Session',
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
export default SessionsDetailScreen;
