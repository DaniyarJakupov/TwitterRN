import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewTweetScreen from './screens/NewTweetScreen';

import HeaderAvatar from './components/HeaderAvatar';
import HeaderButton from './components/HeaderButton';

import { colors } from './utils/constants';

const TAB_ICON_SIZE = 20;

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Home',
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <HeaderButton side="right" onPress={() => navigation.navigate('NewTweet')}>
            <MaterialCommunityIcons size={25} color={colors.PRIMARY} name="feather" />
          </HeaderButton>
        ),
        tabBarIcon: ({ tintColor }) => <Icon size={TAB_ICON_SIZE} color={tintColor} name="home" />,
      }),
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Explore',
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <HeaderButton side="right" onPress={() => {}}>
            <Icon size={25} color={colors.PRIMARY} name="search" />
          </HeaderButton>
        ),
        tabBarIcon: ({ tintColor }) => (
          <Icon size={TAB_ICON_SIZE} color={tintColor} name="search" />
        ),
      }),
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: 'Notifications',
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <HeaderButton side="right" onPress={() => {}}>
            <Icon size={25} color={colors.PRIMARY} name="bell" />
          </HeaderButton>
        ),
        tabBarIcon: ({ tintColor }) => <Icon size={TAB_ICON_SIZE} color={tintColor} name="bell" />,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <HeaderButton side="right" onPress={() => {}}>
            <Icon size={25} color={colors.PRIMARY} name="user" />
          </HeaderButton>
        ),
        tabBarIcon: ({ tintColor }) => <Icon size={TAB_ICON_SIZE} color={tintColor} name="user" />,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  }
);

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar disable />,
        headerRight: (
          <HeaderButton
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <MaterialIcons size={25} color={colors.PRIMARY} name="close" />
          </HeaderButton>
        ),
      }),
    },
  },
  {
    headerMode: 'none',
    mode: 'card',
  }
);

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    NewTweet: {
      screen: NewTweetModal,
    },
  },
  {
    mode: 'modal',
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
  }
);

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    if (!this.props.user.isAuth) {
      return <AuthScreen />;
    }
    return <AppMainNav navigation={nav} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  user: state.user,
});

export default connect(mapStateToProps)(AppNavigator);

export const router = AppMainNav.router;
