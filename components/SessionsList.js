import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  FlatList,
  AsyncStorage,
} from 'react-native';
// import RestUrls from '../constants/RestUrls';
import loadRestAPI from './RestDataManager';
import decNumRefToString from './decNumRefToString';

class SessionsList extends React.Component {
  state = {
    // eslint-disable-next-line
    rooms: [],
    sessions: [],
    speakers: [],
    fablist: {},
    listUpdate: 0,
    displayMode: 'ALL',
  };

  componentWillMount() {
    // fabolite list
    // let fablist = {};
    console.log('props displayMode');
    console.log(this.props.displayMode);
    this.setState({ displayMode: this.props.displayMode });
    AsyncStorage.getItem('faboliteSessions').then((dat) => {
      console.log('dat');
      console.log(dat);
      if ((dat !== undefined) || (dat !== null) || (dat !== '')) {
        // const data = dat.replace(/\\/g, '');
        // data = data.replace(/"""""""/g, '');
        // console.log('data');
        // console.log(data);
        const fabData = JSON.parse(dat);
        if ((dat === '') || (dat === '[]')) {
          this.setState({ fablist: {} });
        } else {
          this.setState({ fablist: fabData });
        }
        // this.setState({ fablist: {} });
      } else {
        this.setState({ fablist: {} });
      }
      // when reset
      // this.setState({ fablist: {} });

      /*
      if ((fablist === undefined) || (fablist === null)) {
        SecureStore.setItemAsync('faboliteSessions', '');
        fablist = {};
      }
      */
      // this.setState({ fablist: fablist });
      // const sessionsData = loadRestAPI();
      loadRestAPI().then(
        (sessionsData) => {
          // console.log('data', sessionsData);
          const sessionsList = [];
          if ((sessionsData[0] !== undefined)
            && (sessionsData[1] !== undefined)
            && (sessionsData[2] !== undefined)) {
            sessionsData[0].forEach((item) => {
              if (item.id !== undefined) {
                sessionsList.push({ ...item, key: item.id.toString() });
              }
            });
            // console.log(sessionsList);
            this.setState({ sessions: sessionsList });

            const roomsList = [];
            sessionsData[1].forEach((item) => {
              if (item.id !== undefined) {
                roomsList.push({ ...item, key: item.id.toString() });
              }
            });
            // this.setState({ rooms: roomsList });
            this.setState({ speakers: sessionsData[2] });
          }
        },
      );
    });
  }

  screenReflesh() {
    console.log('update called');
    this.setState(prevState => ({ listUpdate: prevState.listUpdate + 1 }));
    console.log('props');
    console.log(this.props.displayMode);
    console.log('state');
    console.log(this.state.displayMode);
    this.setState({ displayMode: this.props.displayMode });
    console.log('state-up');
    console.log(this.state.displayMode);
    console.log(this.state.listUpdate);
    this.forceUpdate();
  }

  renderSession({ item }) {
    // console.log(item);
    // console.log('item-id');
    // // console.log(item.id.toString());

    function fabHandler() {
      const { id } = item;
      const indexId = `star${id.toString()}`;
      // console.log(`clicked${id}`);
      let { fablist } = this.state;

      //  const fablist = JSON.parse(AsyncStorage.getItem('faboliteSessions'));
      // console.log('fablist');
      // console.log(fablist);
      if ((fablist === null) || (fablist === undefined)) {
        fablist = {};
      }
      if ((fablist[indexId] === null) || (fablist[indexId] === undefined)) {
        fablist[indexId] = null;
      }
      if ((fablist[indexId] !== undefined) && (fablist[indexId] !== null)) {
        // console.log('set fablist');
        if (fablist[indexId] === undefined) {
          // console.log('set fablist new');
          fablist[indexId] = true;
        } else if (fablist[indexId] === true) {
          fablist[indexId] = false;
        } else {
          fablist[indexId] = true;
        }
      } else {
        // console.log('set fablist of empty');
        fablist[indexId] = true;
        // console.log('result');
        // console.log(fablist);
      }
      this.setState(fablist);
      // console.log('update fablist');
      // console.log(fablist);
      // console.log('update fablist record');
      // console.log(fablist[indexId]);
      // console.log(JSON.stringify(fablist));
      AsyncStorage.setItem('faboliteSessions', JSON.stringify(fablist));
      // this.setState({ listUpdate: this.state.listUpdate + 1 });
      this.setState(prevState => ({ listUpdate: prevState.listUpdate + 1 }));
      // console.log('update state fablist');
      // console.log(this.state.fablist);
    }

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
          <TouchableHighlight style={styles.button} onPress={fabHandler.bind(this)}>
            <Text style={styles.sessionsBookmarkStar}>
              { this.state.fablist[`star${item.id.toString()}`] ? '★' : '☆' }
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    const allData = this.state.sessions;
    const selectedData = [];
    const fabData = this.state.fablist;
    // eslint-disable-next-line
    for (let key in allData) {
      // if (fabData[key] === true) {
      // console.log('fabData[key]');
      // console.log(key);
      // console.log(allData[key].id);
      const { id } = allData[key];
      const indexId = `star${id.toString()}`;
      if ((fabData[indexId] !== undefined) && (fabData[indexId] === true)) {
        // selectedData[dataCount] = allData[key];
        selectedData.push(allData[key]);
      }
      // console.log(fabData[key]);
      // const idkey = parseInt(key.replace(/^star/, ''), 10);
      // console.log(idkey);
      // }
    }
    // console.log('selected data');
    // console.log(selectedData);
    // console.log(allData);
    // console.log('fabdata in render');
    // console.log(fabData);

    let displayData = [];
    if (this.state.displayMode === 'STAR') {
      displayData = selectedData;
    } else {
      displayData = allData;
    }

    return (
      <ScrollView style={styles.sessionsList}>
        <FlatList
          data={displayData}
          execData={this.state.listUpdate}
          renderItem={this.renderSession.bind(this)}
        />
      </ScrollView>
    );
  }
}

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
