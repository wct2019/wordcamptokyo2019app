import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from 'react-native';
// import RestUrls from '../constants/RestUrls';
import loadRestAPI from './RestDataManager';
import decNumRefToString from './decNumRefToString';

class SessionsList extends React.Component {
  state = {
    rooms: [],
    sessions: [],
    speakers: [],
  };

  componentWillMount() {
    // const sessionsData = loadRestAPI();
    loadRestAPI().then(
      (sessionsData) => {
        console.log('data', sessionsData);
        const sessionsList = [];
        sessionsData[0].forEach((item) => {
          if (item.id !== undefined) {
            sessionsList.push({ ...item, key: item.id.toString() });
          }
        });
        console.log(sessionsList);
        this.setState({ sessions: sessionsList });

        const roomsList = [];
        sessionsData[1].forEach((item) => {
          if (item.id !== undefined) {
            roomsList.push({ ...item, key: item.id.toString() });
          }
        });
        console.log(roomsList);
        this.setState({ rooms: roomsList });

        /*
        const speakersList = [];
        sessionsData[2].forEach((item) => {
          if (item.id !== undefined) {
            speakersList.push({ ...item, key: item.id.toString() });
          }
        });
        console.log(speakersList);
        this.setState({ speakers: speakersList });
        */
        this.setState({ speakers: sessionsData[2] });
      },
    );
    console.log('sessions', this.state.sessions);
    console.log('rooms', this.state.rooms);
    console.log('speakers', this.state.speakers);
  }

  renderSession({ item }) {
    console.log(item);
    console.log('item-id');
    // console.log(item.id.toString());
    return (
      <View style={styles.sessionsListItem}>
        <TouchableHighlight onPress={() => { this.props.navigation.navigate('SessionDetail', { selectedSession: item, sessions: this.state.sessions, speakers: this.state.speakers }); }}>
          <View style={styles.sessionsListItemContent}>
            <Text style={styles.sessionTitle}>{decNumRefToString(item.title.rendered)}</Text>
            <Text style={styles.sessionStartTime}>
              { item.session_date_time.date + item.session_date_time.time }
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.sessionsListItemBookmark}>
          <Text style={styles.sessionsBookmarkStar}>☆</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.sessionsList}>
        <FlatList data={this.state.sessions} renderItem={this.renderSession.bind(this)} />
      </ScrollView>
    );
  }
}

/*
function get(url) {
  // eslint-disable-next-line
  return fetch(url);
}

async function loadRestAPI() {
  const results = [];
  // const urls = [RestUrls.tracks, RestUrls.sessions, RestUrls.speakers];
  // eslint-disable-next-line
  results.push(get(RestUrls.tracks).then(response => response.json()));
  results.push(get(RestUrls.speakers).then(response => response.json()));
  results.push(get(RestUrls.sessions).then(response => response.json()));
  // console.log(await Promise.all(results));
  const returnREST = await Promise.all(results);
  console.log(returnREST);
  console.log(returnREST[0]);
  console.log(returnREST[1]);
  console.log(returnREST[2]);
}
*/

const styles = StyleSheet.create({
  sessionsList: {
    width: '100%',
    flex: 1,
  },
  sessionsListItem: {
    flexDirection: 'row',
    padding: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#D69D12',
  },
  sessionsListItemContent: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
  },
  sessionsListItemBookmark: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  sessionStartTime: {
    fontSize: 12,
    color: '#fff',
  },
  sessionsBookmarkStar: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
});

export default SessionsList;
