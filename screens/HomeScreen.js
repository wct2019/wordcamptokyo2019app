import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ImageBackground,
} from 'react-native';
import LogoTitle from '../navigation/LogoTitle';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/TopBGImg.png')}
          imageStyle={{ width: '100%', height: '100%' }}
          resizeMode="repeat"
          style={{ ...StyleSheet.absoluteFillObject, width: undefined, height: undefined }}
        >
          <View
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <TouchableOpacity onPress={handleOfficialWebSitePress} style={styles.helpLink}>
                <Image
                  source={
                    // eslint-disable-next-line
                    require('../assets/images/TopMainImg.png')
                    // require('../assets/images/wct2019_wapuu.png')
                  }
                  style={styles.welcomeImage}
                />
              </TouchableOpacity>
              <TouchableHighlight style={styles.linkbutton} onPress={() => { this.props.navigation.navigate('Home'); }}>
                <Text style={styles.linkbuttonText}>コントリビューターデイ</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.linkbutton} onPress={() => { this.props.navigation.navigate('Home'); }}>
                <Text style={styles.linkbuttonText}>アフターパーティー</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.linkbutton} onPress={() => { this.props.navigation.navigate('Home'); }}>
                <Text style={styles.linkbuttonText}>新着情報（公式ブログ）</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  // header: null,
  title: 'WordCamp Tokyo 2019',
  headerTitle: <LogoTitle />,
  headerStyle: {
    backgroundColor: '#2C9060',
  },
};

function handleOfficialWebSitePress() {
  WebBrowser.openBrowserAsync(
    'https://2019.tokyo.wordcamp.org/',
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E3',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 0,
  },
  welcomeImage: {
    width: 224,
    height: 224,
    resizeMode: 'contain',
    margin: 0,
  },
  welcomeLogo: {
    width: '90%',
    height: '30%',
    resizeMode: 'contain',
    marginTop: 24,
    padding: 16,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  linkbutton: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#D69D12',
    height: 39,
    width: 288,
  },
  linkbuttonText: {
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 39,
    textAlign: 'center',
    textAlignVertical: 'center',
    letterSpacing: 0.32,
    color: '#FFFFFF',
  },
});

export default HomeScreen;
