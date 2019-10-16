import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import SessionsList from '../components/SessionsList';
import LogoTitle from '../navigation/LogoTitle';

class BookmarkListScreen extends React.Component {
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
        <Text>Sessions List</Text>
        <SessionsList navigation={this.props.navigation} />
      </View>
    );
  }
}

BookmarkListScreen.navigationOptions = {
  title: 'Bookmarks',
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
export default BookmarkListScreen;
