import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SessionsListScreen from '../screens/SessionsListScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';
import SpeakerProfileScreen from '../screens/SpeakerProfileScreen';
import TicketScreen from '../screens/TicketScreen';
import TicketQRScreen from '../screens/TicketQRScreen';
import BookmarkScreen from '../screens/BookmarkListScreen';
import ExhibitionListScreen from '../screens/ExhibitionListScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    // Home: SessionsListScreen,
  },
  config,
);

HomeStack.navigationOptions = () => ({
  tabBarLabel: 'ホーム',
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
});

HomeStack.path = '';


const TicketStack = createStackNavigator(
  {
    TicketQR: TicketQRScreen,
    Ticket: TicketScreen,
    // Home: SessionsListScreen,
  },
  config,
);

TicketStack.navigationOptions = () => ({
  tabBarLabel: 'チケット',
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-log-in'
          : 'md-log-in'
      }
    />
  ),
});

HomeStack.path = '';

const SessionsListStack = createStackNavigator(
  {
    SessionList: SessionsListScreen,
    SessionDetail: SessionDetailScreen,
    SpeakerProfile: SpeakerProfileScreen,
  },
  config,
);

SessionsListStack.navigationOptions = {
  tabBarLabel: 'セッション',
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-megaphone' : 'md-megaphone'} />
  ),
};

SessionsListStack.path = '';

const BookmarksStack = createStackNavigator(
  {
    Links: BookmarkScreen,
  },
  config,
);

BookmarksStack.navigationOptions = {
  tabBarLabel: 'My Bookmarks',
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'} />
  ),
};

BookmarksStack.path = '';

const ExhibitionListStack = createStackNavigator(
  {
    Links: ExhibitionListScreen,
  },
  config,
);

ExhibitionListStack.navigationOptions = {
  tabBarLabel: 'アクセス',
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} />
  ),
};

ExhibitionListStack.path = '';

/*
const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config,
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';
*/

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config,
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  headerStyle: {
    backgroundColor: '#2C9060',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  TicketStack,
  SessionsListStack,
  ExhibitionListStack,
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#2C9060',
    },
    labelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    activeTintColor: '#ffffff',
    activeBackgroundColor: '#164830',
    inactiveTintColor: '#ffffff',
  },
});

tabNavigator.path = '';

export default tabNavigator;
