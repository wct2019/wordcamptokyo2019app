import React from 'react';
import {
  Image,
} from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/topTitle.png')}
        style={{ width: 140, height: 30 }}
      />
    );
  }
}
export default LogoTitle;
