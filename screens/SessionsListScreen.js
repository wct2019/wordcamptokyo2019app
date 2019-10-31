import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import SessionsList from '../components/SessionsList';
import LogoTitle from '../navigation/LogoTitle';

class SessionsListScreen extends React.Component {
  state = {
  }
  /*
  componentWillMount() {

  }
  */

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sessiontsTopItem}>
          <Text style={styles.sessionsTop}>セッションリスト</Text>
          {/*
          <View style={styles.sessionsTopBookmarkLink}>
            <Text style={styles.sessionsTopBookmarkLinkText}>お気に入りを表示する★</Text>
          </View>
          */}
        </View>
        <SessionsList navigation={this.props.navigation} />
      </View>
    );
  }
}

SessionsListScreen.navigationOptions = {
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
  sessiontsTopItem: {
    marginTop: 22,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  sessionsTop: {
    color: '#2C9060',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sessionsTopBookmarkLink: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderWidth: 0.5,
    borderColor: '#D69D12',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  sessionsTopBookmarkLinkText: {
    color: '#D69D12',
    fontSize: 14,
  },
});
export default SessionsListScreen;
