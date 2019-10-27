import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Linking,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';

class AccessInfoScreen extends React.Component {
  /*
  state = {
    sessionsList: [],
  }
  componentWillMount() {

  }
  */
  render() {
    function linkHandler(url) {
      Linking.openURL(url);
    }
    return (
      <View style={styles.container}>
        <View
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <TouchableHighlight style={styles.linkbutton} onPress={() => { linkHandler('https://2019.tokyo.wordcamp.org/access/'); }}>
              <Text style={styles.linkbuttonText}>会場までのアクセスはこちらから</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.linkbutton} onPress={() => { linkHandler('https://2019.tokyo.wordcamp.org/a11y/'); }}>
              <Text style={styles.linkbuttonText}>会場内の設備についてはこちらから</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

AccessInfoScreen.navigationOptions = {
  title: 'アクセス',
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
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 128,
    marginBottom: 0,
  },
  linkbutton: {
    marginTop: 36,
    alignItems: 'center',
    backgroundColor: '#D69D12',
    height: 48,
    width: 340,
    borderRadius: 6,
  },
  linkbuttonText: {
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 48,
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 0.32,
    color: '#FFFFFF',
  },

});
export default AccessInfoScreen;
