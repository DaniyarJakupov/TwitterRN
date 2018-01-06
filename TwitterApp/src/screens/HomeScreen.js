// @flow
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, withApollo } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedCard from '../components/FeedCards/FeedCard';

import { colors } from '../utils/constants';

import GET_TWEETS_QUERY from '../graphql/queries/getTweets'; // graphql query
import GET_ME_QUERY from '../graphql/queries/me'; // graphql query
import TWEET_ADDED_SUBSCRIPTION from '../graphql/subscriptions/tweetAdded'; // graphql query
import { getUserInfo } from '../redux/actions'; // redux action

const Wrapper = styled.View`
  flex: 1;
  padding-top: 5;
`;

class HomeScreen extends Component {
  state = {};

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: TWEET_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newTweet = subscriptionData.data.tweetAdded;

        if (!prev.getTweets.find(tweet => tweet._id === newTweet._id)) {
          return {
            ...prev,
            getTweets: [{ ...newTweet }, ...prev.getTweets],
          };
        }

        return prev;
      },
    });
  }

  componentDidMount() {
    this._getUserInfo();
  }

  onActionBtnPress = () => {
    this.props.navigation.navigate('NewTweet');
  };

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: GET_ME_QUERY }); // get user info
    this.props.getUserInfo(me);
  };

  _renderItem = ({ item }) => <FeedCard {...item} />;

  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Wrapper>
          <ActivityIndicator size="large" />
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
        />

        <ActionButton
          buttonColor={colors.PRIMARY}
          icon={<Icon size={25} color={colors.WHITE} name="feather" />}
          onPress={this.onActionBtnPress}
        />
      </Wrapper>
    );
  }
}

export default withApollo(
  compose(graphql(GET_TWEETS_QUERY), connect(undefined, { getUserInfo }))(HomeScreen)
);
