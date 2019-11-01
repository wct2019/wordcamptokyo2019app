import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import SessionsList from '../components/SessionsList';
import LogoTitle from '../navigation/LogoTitle';

class SessionsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    displayMode: 'ALL',
    fabButtonText: 'お気に入りを表示する★',
  }

  render() {
    function changeSelectedSession() {
      const { displayMode } = this.state;
      console.log('displayMode');
      console.log(displayMode);
      if (displayMode === 'STAR') {
        this.setState({ displayMode: 'ALL' });
        this.setState({ fabButtonText: '全セッションを表示する★' });
      } else {
        this.setState({ displayMode: 'STAR' });
        this.setState({ fabButtonText: 'お気に入りを表示する★' });
      }
      this.render();
      this.child.current.screenReflesh();
    }
    // const { displayMode } = this.state;
    console.log('new displayMode');
    console.log(this.state.displayMode);

    return (
      <View style={styles.container}>
        <View style={styles.sessiontsTopItem}>
          <Text style={styles.sessionsTop}>セッションリスト</Text>
          <TouchableHighlight style={styles.button} onPress={changeSelectedSession.bind(this)}>
            <View style={styles.sessionsTopBookmarkLink}>
              <Text style={styles.sessionsTopBookmarkLinkText}>{this.state.fabButtonText}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <SessionsList
          navigation={this.props.navigation}
          displayMode={this.state.displayMode}
          ref={this.child}
        />
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
